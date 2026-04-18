import { Router } from "express"
import * as auth_controller from "../controllers/auth.controller.js"
import { auth_m, ifLogged } from "../middlewares/auth.middleware.js"

const authR = Router()

authR.get("/", (req, res) => {
    return res.redirect("/")
})

authR.get("/register", ifLogged, (req, res) => {
    res.render("guest/register")
})

authR.post("/register", auth_controller.register_c)

authR.get("/login", ifLogged, (req, res) => {
    res.render("guest/login")
})

authR.post("/login", auth_controller.login_c)

authR.get("/forgot-password", ifLogged, (req, res) => {
    res.render("guest/forgotpass")
})

authR.post("/forgot-password", auth_controller.forgot_password_c)

export default authR