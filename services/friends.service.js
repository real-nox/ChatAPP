import * as user_repository from "../repositories/user.repository.js"
import * as friends_repository from "../repositories/friends.repository.js"

export const sendFriendRequest = async (username, sender) => {
    try {
        const reciever = await user_repository.getUserViaUsername(username)

        if (!reciever || !reciever.id)
            return { success: false, error: "Could not find user" }

        if (!sender || !sender.id)
            return { success: false, error: "Could not find current user" }

        const alreadyRequested = await friends_repository.getFriendRequest(reciever.id, sender.id)
        
        if (alreadyRequested)
            return { success: false, error: `Request was already been sent to ${username}` }
        const result = await friends_repository.sendFriendRequest(reciever.id, sender.id)

        if (!result)
            return { success: false, error: `Could not send friend request to ${username}` }

        return { success: true, error: "" }
    } catch (error) {
        console.log(error)
    }
}