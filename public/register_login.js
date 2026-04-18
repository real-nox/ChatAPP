const valid = {
    password: false,
    username: false,
    pwdcheck: false
}

const passwordCheck = document.getElementById("passwordCheck")
const password = document.getElementById("pwd")
const username = document.getElementById("username")
const eye = document.getElementById("eye")
const eyeopened = document.getElementById("eyeopened")

eye.addEventListener("mousedown", () => {
    password.type = "text"
    eye.innerText = "visibility"
})
eye.addEventListener("mouseup", () => {
    password.type = "password"
    eye.innerText = "visibility_off"
})
eye.addEventListener("mouseleave", () => {
    password.type = "password"
    eye.innerText = "visibility_off"
})

const username_error = document.getElementById("CheckingUsername")

function CheckValid() {
    console.log(valid)
    if (valid.password && valid.pwdcheck && valid.username) {
        document.getElementById("createBTN").disabled = false
    } else {
        document.getElementById("createBTN").disabled = true
    }
}

username.addEventListener("input", (ev) => {
    console.log(ev.target.value)
    if (ev.target.value != ev.target.value.toLowerCase() || ev.target.value.includes(" ") || ev.target.value.match(/[!@#$%^&*(),?":{}|<>]/g)) {
        username_error.innerText = "Username should contain lowercase letters or '_' '.'"
        valid.username = false
    } else {
        username_error.innerText = ""
        valid.username = true
    }

    CheckValid()
})

password.addEventListener("input", (ev) => {
    console.log(ev.target.value.length)
    if (ev.target.value.length < 5) {
        document.getElementById("CheckingPWD").innerText = "Weak password."
        valid.password = false
    } else {
        document.getElementById("CheckingPWD").innerText = ""
        valid.password = true
    }

    CheckValid()
})

passwordCheck.addEventListener("input", (ev) => {
    if (ev.target.value != password.value) {
        document.getElementById("CheckingPassword").innerText = "PASSWORD ARE NOT MATCHED"
        valid.pwdcheck = false
    } else {
        document.getElementById("CheckingPassword").innerText = ""
        valid.pwdcheck = true
    }

    CheckValid()
})