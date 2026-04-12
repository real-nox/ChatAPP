import { Router } from "express";
import { accept_request_c, decline_request_c, get_request_c, list_friends_c, send_request_c } from "../controllers/friends.controller.js";
import { auth_m } from "../middlewares/auth.middleware.js";

const friendsR = Router()

friendsR.use(auth_m)

friendsR.post("/requests/send", send_request_c)

friendsR.patch("/requests/:id/accept", accept_request_c)

friendsR.patch("/requests/:id/decline", decline_request_c)

friendsR.get("/requests/pending", get_request_c)

friendsR.get("/list", list_friends_c)

export default friendsR