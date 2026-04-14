export function initSocket(io) {
    io.on("connection", (socket) => {
        console.log("[LiveServer] Connection established!")
        const user_id = socket.request.session.userId

        socket.on("disconnect", () => {
            console.log("Disconnected.")
        })

        socket.on("joinroom", (roomName) => {
            socket.join(roomName)
            console.log(`Socket ${socket.id} joined room ${roomName}`)
        })

        socket.on("messageSend", ({ roomName, content }) => {
            console.log(`message in room ${roomName}: ${content}`)

            socket.to(roomName).emit("messageRecieve", { content })
        })
    })
}