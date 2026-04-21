document.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("settingsBTN")) {
        document.getElementById("settingsContainer").classList.add("show")
    }

    if (ev.target.classList.contains("closeSettings")) {
        document.getElementById("settingsContainer").classList.remove("show")
    }
})