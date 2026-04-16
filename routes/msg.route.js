import { Router } from "express";
import { seenMSG_c } from "../controllers/msg.controller.js";
import { auth_m } from "../middlewares/auth.middleware.js";

const msg = Router()

msg.get("/", (req, res) => {
    res.redirect("/")
})

msg.patch("/:message_id/seen", auth_m, seenMSG_c)

export default msg