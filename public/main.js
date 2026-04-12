const current_user_id = document.getElementById("settings").dataset.id

document.getElementById("addFriendForm").addEventListener("submit", async (ev) => {
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
})

document.getElementById("requestsBTN").addEventListener("click", async () => {
    const list = document.getElementById("friendsReqList")

    if (list.style.display == "none" || list.style.display == "") {
        list.style.display = "flex";

        const listFriendsReq = await getPendingFReq()

        if (listFriendsReq == null)
            return document.getElementById("listFriends").innerHTML = "No friend request"

        document.getElementById("listFriends").innerHTML = ""

        let div = ""

        for (const friend of (listFriendsReq)) {
            console.log(friend)

            div += `<div class="friendtemplate">
                    <div class="avatarUser">
                        <img src="" alt="avatar">
                    </div>
                    <div class="info">
                        <p>${friend.username}</p>
                    </div>`

            console.log(current_user_id)
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
})

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

document.addEventListener("click", async (ev) => {
    if (ev.target.classList.contains("checkBTN")) {
        try {
            const req_id = ev.target.dataset.id
            console.log(req_id)
            const result = await fetch(`/friends/requests/${req_id}/accept`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" }
            })

            const data = await result.json()

            console.log(data)
        } catch (err) {
            console.log(err);
        }
    }
})