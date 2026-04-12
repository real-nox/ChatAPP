import { pool } from "../db/index.db.js"
import { getUserById } from "./user.repository.js"

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
        const result = await pool.query("select * from friends_requests where (sender_id = $1 and reciever_id = $2) or (sender_id = $2 and reciever_id = $1)", [senderId, recieverId])

        if (result?.rowCount > 0)
            return true
        return false
    } catch (error) {
        console.log(error)
    }
}

export const getFriendsRequest = async (senderId) => {
    try {
        const result = await pool.query(`SELECT fr.id, fr.created_at, fr.sender_id, u.username 
            FROM friends_requests fr JOIN users u ON u.id = fr.sender_id
            WHERE fr.reciever_id = $1 AND fr.status = 'pending'`,
            [senderId]
        )

        if (result?.rowCount > 0) {
            let resultat = Array();

            for (const data of result?.rows) {
                resultat.push({ request_id: data.id, username: data.username, created_at: data.created_at, sender_id: data.sender_id });
            }
            console.log(resultat)
            return resultat
        }
        return false
    } catch (error) {
        console.log(error)
    }
}

export const acceptReqF = async (request_id, user_id) => {
    try {
        const result = await pool.query("update friends_requests set status = 'accepted' where id = $1 and reciever_id = $2", [request_id, user_id])

        if (result?.rowCount > 0)
            return true
        return false
    } catch (err) {
        console.log(err)
    }
}

export const declinetReqF = async (request_id, user_id) => {
    try {
        const result = await pool.query("update friends_requests set status = 'declined' where id = $1 and reciever_id = $2", [request_id, user_id])

        if (result?.rowCount > 0)
            return true
        return false
    } catch (err) {
        console.log(err)
    }
}