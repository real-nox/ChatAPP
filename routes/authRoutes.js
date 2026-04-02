import { Router } from "express"

const authR = Router()

authR.get("/register", (req, res) => {
    res.render("register")
})

authR.post("/register", (req, res) => {

})

authR.get("/login", (req, res) => {
    res.render("login")
})

authR.post("/login", (req, res) => {

})

authR.get("/logout", (req, res) => {

})

export default authR