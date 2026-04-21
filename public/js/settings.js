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

let theme = localStorage.getItem("theme") || "dark"
if (theme) { 
    document.querySelector(".window").dataset.theme = theme 
    document.querySelector("#settingsContainer").dataset.theme = theme
}

function toggleTheme() {
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
}

/* Database side will be added later
async function getTheme() {

}

async function setTheme() {

}
*/