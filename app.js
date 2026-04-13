import express from "express"
import session from "express-session"
import connectpg from "connect-pg-simple"
import { createServer } from "http"
import { Server } from "socket.io"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { config } from "dotenv"

config({ quiet: true })
const __dirname = dirname(fileURLToPath(import.meta.url))

import { LoadDB, pool } from "./db/index.db.js"

import authR from "./routes/auth.route.js"
import friendsR from "./routes/friends.route.js"

import { auth_m } from "./middlewares/auth.middleware.js"
import { initSocket } from "./chat/socket.js"

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer)

const PGStore = connectpg(session)

app.use(express.static(join(__dirname, "public")))

app.set("views", join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    store: new PGStore({ pool: pool }),
    secret: process.env.SSSKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

//Routes
app.use("/auth", authR)
app.use("/friends", friendsR)

app.get("/", auth_m, async (req, res) => {
    res.render("home", { user: req.user })
})

httpServer.listen(5500, async () => {
    console.log("[SERVER] Running on http://localhost:5500")
    await LoadDB()
    initSocket(io)
})