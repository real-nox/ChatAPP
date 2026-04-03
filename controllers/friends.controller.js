import * as friends_service from "../services/friends.service.js"

export const send_request_c = async (req, res, next) => {
    const username = req?.body?.friendUsername

    if (!username)
        return res.json({success: false, error : "Fill in the form"})

    const sender = req?.user

    const result = await friends_service.sendFriendRequest(username, sender)

    return res.json(result)
}