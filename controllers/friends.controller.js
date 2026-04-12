import * as friends_service from "../services/friends.service.js"

export const send_request_c = async (req, res, next) => {
    const username = req?.body?.friendUsername

    if (!username)
        return res.json({ success: false, error: "Fill in the form" })

    const sender = req?.user

    try {
        const result = await friends_service.sendFriendRequest(username, sender)

        return res.json(result)
    } catch (err) {
        next(err)
    }
}

export const get_request_c = async (req, res, next) => {
    const sender = req?.user

    try {
        const result = await friends_service.getFriendsRequest(sender)

        return res.json(result)
    } catch (err) {
        next(err)
    }
}

export const accept_request_c = async (req, res, next) => {
    const request_id = req?.params?.id

    try {
        if (!request_id)
            return res.json({ success: false, error: "Request id is not provided"})

        const resultat = await friends_service.acceptFriendRequest(request_id)

        return res.json(resultat)
    } catch (err) {
        console.log(err)
    }
}