import * as auth_service from "../services/auth.service.js"

export const register_c = async (req, res, next) => {
    const { username, display_name, email, pwd, passwordCheck } = req?.body

    if (!username || !display_name || !email || !pwd || !passwordCheck)
        return res.render("guest/register", { error: "Complete the form" })

    if (pwd !== passwordCheck)
        return res.render("guest/register", { error: "Passwords are not matching!" })

    try {
        const { success, error } = await auth_service.register_s({ display_name, username, email, pwd })

        if (!success) return res.render("guest/register", { error })

        return res.redirect("/auth/login")
    } catch (err) {
        next(err)
    }
}

export const login_c = async (req, res, next) => {
    const { user_email, pwd } = req.body

    if (!user_email || !pwd)
        return res.render("guest/login", { error: "Complete the form" })

    try {
        const { success, error, user = null } = await auth_service.login_s({ user_email, pwd })

        if (!success) return res.render("guest/login", { error })

        req.session.userId = user.id
        return res.redirect("/")
    } catch (err) {
        next(err)
    }
}

export const logout_c = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err)
            res.clearCookie("connect.sid")
            return res.redirect("/auth/login")
    })
}

export const forgot_password_c = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err)
    }
}