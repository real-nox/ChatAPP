document.addEventListener("click", (ev) => {

    //Settings container
    if (ev.target.classList.contains("settingsContainer")) {
        document.getElementById("settingsContainer").classList.remove("show")
    }

    if (ev.target.classList.contains("settingsBTN")) {
        document.getElementById("settingsContainer").classList.add("show")
    }

    if (ev.target.classList.contains("closeSettings")) {
        document.getElementById("settingsContainer").classList.remove("show")
    }

    if (ev.target.classList.contains("accountS")) {
        document.querySelectorAll(".options").forEach(option => {
            if (option.classList.contains("show") && !option.classList.contains("accountSet"))
                option.classList.remove("show")
            if (option.classList.contains("accountSet") && !option.classList.contains("show"))
                option.classList.add("show")
        })
    }

    if (ev.target.classList.contains("apperance")) {
        document.querySelectorAll(".options").forEach(option => {
            if (option.classList.contains("show") && !option.classList.contains("apperanceSet"))
                option.classList.remove("show")
            if (option.classList.contains("apperanceSet") && !option.classList.contains("show"))
                option.classList.add("show")
        })
    }
})

let theme = null

window.addEventListener("load", async (ev) => {
    theme = localStorage.getItem("theme") || await getTheme()

    console.log(theme)
    if (theme) {
        document.querySelector(".window").dataset.theme = theme
        document.querySelector("#settingsContainer").dataset.theme = theme
    }
})

async function toggleTheme() {
    theme = localStorage.getItem("theme") || await getTheme()
    if (theme == "dark") {
        theme = "light"
        localStorage.setItem("theme", "light")
        document.querySelector(".window").dataset.theme = theme
        document.querySelector("#settingsContainer").dataset.theme = theme
    } else {
        theme = "dark"
        localStorage.setItem("theme", "dark")
        document.querySelector(".window").dataset.theme = theme
        document.querySelector("#settingsContainer").dataset.theme = theme
    }

    await setTheme()
}

// Database side will be added later
async function getTheme() {
    try {
        const result = await fetch("/auth/theme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: current_user_id })
        })

        let data = await result.json()

        data = data.theme
        return data
    } catch (err) {
    }
}

async function setTheme() {
    try {
        const result = await fetch("/auth/theme", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: current_user_id, theme: theme })
        })

        const data = await result.json()

        return data
    } catch (err) {
    }
}

const username_special_char_reg = /^[a-zA-Z=0-9._-]+$/

document.getElementById("usernameNew").addEventListener("input", (ev) => {
    const chars = ev.target.value
    console.log(chars)
    if (!username_special_char_reg.test(chars)) {
        document.getElementById("error_p").innerText = "Only letters, numbers, . _ - allowed"
        document.getElementById("btnchangeUser").disabled = true
    } else {
        document.getElementById("error_p").innerText = ""
        document.getElementById("btnchangeUser").disabled = false
    }
})

async function submit_newinfo() {
    let new_display_name = document.getElementById("displaynameNew").value
    let new_username = document.getElementById("usernameNew").value

    let display_name = document.getElementById("displaynameNew").dataset.ds
    let username = document.getElementById("usernameNew").dataset.u

    if (display_name == new_display_name && username == new_username)
        document.getElementById("error_p").innerText = "Nothing's changed."
    else {
        document.getElementById("error_p").innerText = ""
        const result = await Modify_user_info(new_username, new_display_name)

        document.getElementById("error_p").innerText = result.msg
    }
}

async function Modify_user_info(new_username, new_display_name) {
    try {
        console.log(new_username, new_display_name)
        const result = await fetch("auth/user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: current_user_id, n_username: new_username, n_display_name: new_display_name })
        })

        const data = await result.json()

        console.log(data)
        return data
    } catch (err) {
        console.error(er)
    }
}