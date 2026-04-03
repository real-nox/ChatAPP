import { pool } from "../db/index.db.js"

export const getUsernames = async (username) => {
    try {
        const result = await pool.query("select username from users where username = $1", [username])

        if (result.rowCount > 0)
            return true
        return false
    } catch (error) {
        console.log(error)
    }
}

export const getEmails = async (email) => {
    try {
        const result = await pool.query("select email from users where email = $1", [email])

        if (result.rowCount > 0)
            return true
        return false
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (user_info) => {
    try {
        const result = await pool.query("insert into users (username, email, password) values ($1, $2, $3)", [user_info.username, user_info.email, user_info.pwd])

        if (result.rowCount > 0)
            return true
        return false
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (user_email) => {
    try {
        const result = await pool.query("select * from users where email = $1 or username = $1", [user_email])

        if (result.rowCount > 0)
            return result.rows[0]
        return false
    } catch (error) {
        console.log(error)
    }
}