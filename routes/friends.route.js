import { Router } from "express";
import { accept_request_c, get_request_c, send_request_c } from "../controllers/friends.controller.js";
import { auth_m } from "../middlewares/auth.middleware.js";

const friendsR = Router()

friendsR.post("/requests/send", auth_m, send_request_c)

friendsR.patch("/requests/:id/accept", accept_request_c)

friendsR.patch("/requests/:id/decline", (req, res) => {

})

friendsR.get("/requests/pending", auth_m, get_request_c)

friendsR.get("/list", (req, res) => {

})

export default friendsR