import * as auth_service from "../services/auth.service.js"

export const register_c = async (req, res, next) => {
    const { username, display_name, email, pwd, passwordCheck } = req?.body

    if (!username || !display_name || !email || !pwd || !passwordCheck)
        return res.render("pages/register", { error: "Complete the form" })

    if (pwd !== passwordCheck)
        return res.render("pages/register", { error: "Passwords are not matching!" })

    try {
        const { success, error } = await auth_service.register_s({ display_name, username, email, pwd })

        if (!success) return res.render("pages/register", { error })

        return res.redirect("/auth/login")
    } catch (err) {
        next(err)
    }
}

export const login_c = async (req, res, next) => {
    const { user_email, pwd } = req.body

    if (!user_email || !pwd)
        return res.render("pages/login", { error: "Complete the form" })

    try {
        const { success, error, user = null } = await auth_service.login_s({ user_email, pwd })

        if (!success) return res.render("pages/login", { error })

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

export const user_get_c = async (req, res, next) => {
    try {
        const { email, pwd = null, passwordCheck = null } = req?.body

        if (pwd == null) {
            if (!email)
                return res.render("pages/forgotpass", { error: "Complete the form" })

            const { success, error, user = null } = await auth_service.fetchUserByEmail(email)

            if (!success)
                return res.render("pages/forgotpass", { error })

            return res.render("pages/forgotpass", { user })
        }

        if (pwd !== passwordCheck)
            return res.render("pages/forgotpass", { error: "Passwords are not matching!" })

        const { success, error } = await auth_service.changeUserPWD(email, pwd)

        if (!success)
            return res.render("pages/forgotpass", { error })

        return res.redirect("/auth/login")
    } catch (err) {
        next(err)
    }
}