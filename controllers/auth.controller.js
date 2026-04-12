import * as auth_service from "../services/auth.service.js"

export const register_c = async (req, res, next) => {
    const { username, email, pwd, passwordCheck } = req.body

    if (!username || !email || !pwd || !passwordCheck)
        return res.render("register", { error: "Complete the form" })

    if (pwd !== passwordCheck)
        return res.render("register", { error: "Passwords aren't matching!" })

    //Check if username is already used (I'll do it in frontend for smooth work)

    try {
        const { success, error } = await auth_service.register_s({ username, email, pwd })

        if (!success) return res.render("register", { error })

        return res.redirect("/auth/login")
    } catch (err) {
        next(err)
    }
}

export const login_c = async (req, res, next) => {
    const { user_email, pwd } = req.body

    if (!user_email || !pwd)
        return res.render("login", { error: "Complete the form" })

    try {
        const { success, error, user = null } = await auth_service.login_s({ user_email, pwd })

        if (!success) return res.render("login", { error })

        req.session.userId = user.id
        return res.redirect("/")
    } catch (err) {
        next(err)
    }
}