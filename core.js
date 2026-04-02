import express from "express"
import { LoadDB, pool } from "./db/data.js"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { config } from "dotenv"

config({ quiet: true })

import session from "express-session"
import connectpg from "connect-pg-simple"

import authR from "./routes/authRoutes.js"

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

const PGStore = connectpg(session)

app.use(express.static(join(__dirname, "public")))

app.set("views", join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(session({
    store: new PGStore({ pool: pool }),
    secret: process.env.SSSKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.use(express.urlencoded({ extended: true }))

app.use("/auth", authR)

app.get("/", async (req, res) => {
    res.render("home")
})

app.listen(5500, async () => {
    console.log("[SERVER] Running on http://localhost:5500")
    await LoadDB()
})