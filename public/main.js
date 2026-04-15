let current_room;

window.addEventListener("load", async (ev) => {
    const { success, error, friends } = await getListFriends()
    const container = document.getElementById("listFriendsDMs")

    if (!success)
        return container.innerHTML = `<p>${error}</p>`

    let div = ""
    for (const friend of friends) {
        socket.emit()
        div += `<div class="friendItem" id="friendItem" data-id="${friend.id}">
                    <button class="friendChannelBTN" id="friendChannelBTN" data-id="${friend.id}">${friend.username}</button>
                    <div class="presence red"></div>
                </div>`
    }

    return container.innerHTML = div
})

const current_user_id = document.getElementById("settings").dataset.id
const current_user_username = document.getElementById("settings").dataset.username

document.addEventListener("submit", async (ev) => {

    if (ev.target.classList.contains("addFriendForm")) {
        ev.preventDefault()

        const input_Username = document.getElementById("usernameInp")
        const label = document.getElementById("labelFriendInp")

        if (!input_Username.value || input_Username.value?.length == 0) {
            label.textContent = "Fill in the form"
            return
        }

        try {
            const result = await fetch("/friends/requests/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ friendUsername: input_Username.value })
            })

            const data = await result.json()

            if (!data.success) {
                label.style.color = "red"
                label.textContent = data.error
            } else {
                label.style.color = "green"
                label.textContent = `Friend request sent to ${input_Username.value}`
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (ev.target.classList.contains("messagesend")) {
        ev.preventDefault()
        const content = document.getElementById("msg").value
        if (!content) return

        socket.emit("messageSend", {
            roomName: current_room,
            content: content
        })

        const message = document.getElementById("chat")

        document.getElementById("msg").value = ""

        let div = `<div class='messagebubble right'>
                    <div class="messageContainer">
                        <div class="msgUser">
                            <p><strong>${current_user_username}</strong></p>
                        </div>
                        <div class="msgContent" id="msgContent">
                            <p>${content}</p>
                        </div >
                        <div class="msgTIME">
                            <p>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: '2-digit' })}</p>
                        </div>
                    </div >
                </div >`

        message.innerHTML += div
    }
})

document.addEventListener("click", async (ev) => {
    if (ev.target.classList.contains("requestsBTN")) {
        const list = document.getElementById("friendsReqList")

        if (list.style.display == "none" || list.style.display == "") {
            list.style.display = "flex";

            const listFriendsReq = await getPendingFReq()

            if (listFriendsReq == null)
                return document.getElementById("listFriends").innerHTML = "No friend request"

            document.getElementById("listFriends").innerHTML = ""

            let div = ""

            for (const friend of (listFriendsReq)) {

                div += `<div class="friendtemplate">
                    <div class="avatarUser">
                        <img src="" alt="avatar">
                    </div>
                    <div class="info">
                        <p>${friend.username}</p>
                    </div>`

                if (friend.sender_id != current_user_id) {
                    div +=
                        `<div class="actions">
                        <span class="material-symbols-outlined check checkBTN" data-id="${friend.request_id}">check</span>
                        <span class="material-symbols-outlined close cancelBTN" data-id="${friend.request_id}">close</span>
                    </div>`
                }
                div += "</div>"
            }
            document.getElementById("listFriends").innerHTML = div

            return
        } else
            return list.style.display = ""
    }

    if (ev.target.classList.contains("checkBTN")) {
        try {
            const req_id = ev.target.dataset.id
            await acceptPendingFReq(req_id)
        } catch (err) {
            console.log(err);
        }
    }

    if (ev.target.classList.contains("cancelBTN")) {
        try {
            const req_id = ev.target.dataset.id
            await declinePendingFReq(req_id)

        } catch (err) {
            console.log(err);
        }
    }

    if (ev.target.classList.contains("friendChannelBTN")) {
        try {
            const room = document.getElementById("friendChannel")

            const top = document.getElementById("top")
            const center = document.getElementById("chat")
            const msgsend = document.getElementById("msgsend")

            top.classList.add("load")
            center.classList.add("load")
            msgsend.classList.add("load")

            const friend_id = ev.target.dataset.id

            console.log(friend_id)
            const { success, error, friend } = await getFriendInfo(friend_id)

            if (!success)
                return console.log(error);

            top.innerHTML = `<p>${friend.id} - ${friend.username}</p>`
            msgsend.innerHTML = `<form id="messagesend" class="messagesend">
                                    <input type="text" name="" id="msg">
                                    <button type="submit"><span class="material-symbols-outlined">send</span></button>
                                </form>`

            current_room = [current_user_id, friend_id].sort().join("_")
            socket.emit("joinroom", current_room)
            console.log(socket)
            console.log("Open chat with ", friend_id, "in room", current_room, socket.id)
        } catch (err) {
            console.log(err)
        }
    }

    if (ev.target.classList.contains("closeSettings")) {
        document.getElementById("settingsContainer").classList.remove("show")
    }
})

socket.on("messageRecieve", ({ content, username }) => {
    const center = document.getElementById("chat")

    let div = `<div class='messagebubble left'>
                    <div class="messageContainer">
                        <div class="msgUser">
                            <p><strong>${username}</strong></p>
                        </div>
                        <div class="msgContent" id="msgContent">
                            <p>${content}</p>
                        </div >
                        <div class="msgTIME">
                            <p>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: '2-digit' })}</p>
                        </div>
                    </div >
                </div >`

    center.innerHTML += div
})

socket.on("loadMessages", ({ messages }) => {
    const room = document.getElementById("friendChannel")

    const top = document.getElementById("top")
    const center = document.getElementById("chat")
    const msgsend = document.getElementById("msgsend")

    if (!messages || messages.length == 0) {
        return center.innerHTML = ""
    }

    for (const { sender_id, username, content, created_at } of messages) {
        let div = ""
        if (sender_id == current_user_id) {
            div = "<div class='messagebubble right'>"
        } else {
            div = "<div class='messagebubble left'>"
        }

        div += `
            <div class="messageContainer">
                    <div class="msgUser">
                        <p><strong>${username}</strong></p>
                    </div>
                    <div class="msgContent" id="msgContent">
                        <p>${content}</p>
                    </div >
                    <div class="msgTIME">
                        <p>${new Date(created_at).toLocaleTimeString([], { hour: "2-digit", minute: '2-digit' })}</p>
                    </div>
            </div >
        </div >`

        center.innerHTML += div
    }
})

socket.on("friendOnline", ({ userId }) => {

    console.log(userId)
    document.querySelectorAll(".friendItem").forEach(friend => {
        if (friend.dataset.id == userId) {
            console.log("target", friend)
            friend.querySelector(".presence").classList.remove("red")
            friend.querySelector(".presence").classList.add("green")
        }
    })
})

socket.on("friendOffline", ({ userId }) => {

    console.log(userId)
    document.querySelectorAll(".friendItem").forEach(friend => {
        if (friend.dataset.id == userId) {
            console.log("target", friend)
            friend.querySelector(".presence").classList.remove("green")
            friend.querySelector(".presence").classList.add("red")
        }
    })
})

async function getListFriends() {
    try {
        const result = await fetch("/friends/list", { method: "GET" })

        const data = await result.json()

        return data
    } catch (err) {
        console.error(err);
    }
}

async function getPendingFReq() {
    try {
        const result = await fetch("/friends/requests/pending", { method: "GET" })

        const data = await result.json()

        if (!data)
            return null

        return data
    } catch (err) {
        console.log(err)
    }
}

async function acceptPendingFReq(req_id) {
    try {
        await fetch(`/friends/requests/${req_id}/accept`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" }
        })
    } catch (err) {
        console.log(err);
    }
}

async function declinePendingFReq(req_id) {
    try {
        await fetch(`/friends/requests/${req_id}/decline`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" }
        })
    } catch (err) {
        console.log(err);
    }
}

async function getFriendInfo(friend_id) {
    try {
        const result = await fetch(`/friends/${friend_id}`, { method: "GET" })

        const data = await result.json()

        return data
    } catch (err) {
        console.error(err);
    }
}