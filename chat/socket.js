export function initSocket(io) {
    io.on("connection", (socket) => {
        console.log("[LiveServer] Connection established!")

        io.on("disconnect", () => {
            console.log("Disconnected.")
        })

        io.on("joinroom", (roomName) => {
            socket.join(roomName)
            console.log(`Socket ${socket.id} joined room ${roomName}`)
        })
    })
}