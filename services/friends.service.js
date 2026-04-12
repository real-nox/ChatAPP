import * as user_repository from "../repositories/user.repository.js"
import * as friends_repository from "../repositories/friends.repository.js"

export const sendFriendRequest = async (username, sender) => {
    try {
        const reciever = await user_repository.getUserViaUsername(username)

        if (!reciever || !reciever.id)
            return { success: false, error: "Could not find user" }

        if (!sender || !sender.id)
            return { success: false, error: "Could not find current user" }

        if (reciever.id == sender.id)
            return { success: false, error: "Cannot add yourself"}

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

export const getFriendsRequest = async (sender) => {
    try {
        if (!sender || !sender.id)
            return { success: false, error: "Could not find current user" }

        const result = await friends_repository.getFriendsRequest(sender.id)

        return result
    } catch (err) {
        console.log(err)
    }
}

export const acceptFriendRequest = async (request_id, user_id) => {
    try {
        if (!request_id)
            return { success: false, error: "Could not find request" }

        if (!user_id)
            return { success: false, error: "Unfound user" }

        const result = await friends_repository.acceptReqF(request_id, user_id)

        if (result)
            return { success: true, error: ""}
        return { success: false, error: "Could not accept request"}
    } catch (err) {
        console.log(err)
    }
}

export const declineFriendRequest = async (request_id, user_id) => {
    try {
        if (!request_id)
            return { success: false, error: "Could not find request" }

        if (!user_id)
            return { success: false, error: "Unfound user" }

        const result = await friends_repository.declinetReqF(request_id, user_id)

        if (result)
            return { success: true, error: ""}
        return { success: false, error: "Could not decline request"}
    } catch (err) {
        console.log(err)
    }
}