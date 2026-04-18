const password = document.getElementById("pwd")
const eye = document.getElementById("eye")

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