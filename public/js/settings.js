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
})

let theme = null

window.addEventListener("load", async (ev) => {
    theme = localStorage.getItem("theme") || await getTheme()

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

        const data = await result.json()

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