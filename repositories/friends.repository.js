import { pool } from "../db/index.db.js"

export const sendFriendRequest = async (recieverId, senderId) => {
    try {
        const result = await pool.query("insert into friends_requests (sender_id, reciever_id) values ($1, $2)", [senderId, recieverId])

        if (result?.rowCount > 0)
            return true
        return false
    } catch (error) {
        console.log(error)
    }
}

export const getFriendRequest = async (recieverId, senderId) => {
    try {
        const result = await pool.query("select * from friends_requests where sender_id = $1 and reciever_id = $2", [senderId, recieverId])

        if (result?.rowCount > 0)
            return true
        return false
    } catch (error) {
        console.log(error)
    }
}