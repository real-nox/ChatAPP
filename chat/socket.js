import { getConversation, getMessages, saveMessage } from "../repositories/chat.repository.js"
import { getUserById } from "../repositories/user.repository.js"

export function initSocket(io) {
    io.on("connection", async (socket) => {
        const user_id = socket.request.session.userId
        const username = (await getUserById(user_id)).username
        console.log(`[LiveServer] Connection established for user ${user_id}!`)

        socket.on("disconnect", () => console.log("Disconnected."))

        socket.on("joinroom", async (roomName) => {
            socket.join(roomName)

            const [user1_id, user2_id] = roomName.split("_")
            const conversation_id = (await getConversation(user1_id, user2_id)).id

            if (!conversation_id)
                return

            socket.conversation_id = conversation_id

            const messages = await getMessages(conversation_id)
            socket.emit("loadMessages", {messages})
        })

        socket.on("messageSend", async ({ roomName, content }) => {
            await saveMessage(socket.conversation_id, user_id, content)
            socket.to(roomName).emit("messageRecieve", { content, username })
        })
    })
}