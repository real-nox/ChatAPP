import { Router } from "express"
import * as auth_controller from "../controllers/auth.controller.js"
import { auth_m } from "../middlewares/auth.middleware.js"

const authR = Router()

authR.get("/register", auth_m, (req, res) => {
    if (req.user)
        return res.redirect("/")
    res.render("register")
})

authR.post("/register", auth_controller.register_c)

authR.get("/login", auth_m, (req, res) => {
    if (req.user)
        return res.redirect("/")
    res.render("login")
})

authR.post("/login", auth_controller.login_c)

authR.get("/logout", (req, res) => {

})

export default authR