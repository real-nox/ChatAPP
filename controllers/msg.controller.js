import * as msg_service from "../services/msg.service.js"

export const seenMSG_c = async (req, res, next) => {
    try {
        console.log("here")
        const user_id = req?.user?.id
        const message_id = req?.params?.message_id

        console.log(message_id)

        const result = await msg_service.msgSeen_s(user_id, message_id)

        return res.json(result)
    } catch (err) {
        next(err)
    }
}