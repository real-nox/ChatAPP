import bcrypt from "bcrypt"
import * as auth_repository from "../repositories/user.repository.js"

export const register_s = async (newUserInfo) => {
    let { username, email, pwd } = newUserInfo

    const FoundUsername = await auth_repository.getUsernames(username)

    if (FoundUsername)
        return { success: false, error: "This username has been already been used! Use another one" }

    const FoundEmail = await auth_repository.getEmails(email)

    if (FoundEmail)
        return { success: false, error: "This email has been already been used! Use another one" }

    const salt = bcrypt.genSaltSync()
    pwd = bcrypt.hashSync(pwd, salt)

    console.log(pwd)
    const result = await auth_repository.addUser({ username, email, pwd })

    if (result)
        return { success: true, error: "" }
    else
        return { success: false, error: "Database error, could not add user!" }

}

export const login_s = async (userInfo) => {
    let { user_email, pwd } = userInfo

    const FoundUser = await auth_repository.getUser(user_email)

    if (!FoundUser)
        return { success: false, error: "Username/Email does not exist! Create a new account." }

    const IsPassWord = bcrypt.compareSync(pwd, FoundUser.password)

    if (!IsPassWord)
        return { success: false, error: "Username/Email or Password is incorrect." }

    return { success: true, error: "", user: FoundUser }
}

export const fetchUser = async (userId) => {
    const User = await auth_repository.getUserById(userId)

    if (!User)
        return { success: false, error: "User is not found!" }

    return { success: true, error: "", user: User }
}