import { Router } from "express"
import * as auth_controller from "../controllers/auth.controller.js"

const authR = Router()

authR.get("/register", (req, res) => {
    res.render("register")
})

authR.post("/register", auth_controller.register_c)

authR.get("/login", (req, res) => {
    res.render("login")
})

authR.post("/login", auth_controller.login_c)

authR.get("/logout", (req, res) => {

})

export default authR