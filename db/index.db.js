import { config } from "dotenv"
import { Pool } from "pg"
config({ quiet: true })

const pool = new Pool({
    host: process.env.host,
    password: process.env.pwd,
    database: "chatapp",
    port: process.env.port,
    user: process.env.user
})

async function LoadDB() {
    const res = await pool.connect()

    if (res) {
        console.log("[DATABASE] Connected successfully")
        res.release()
        return
    }
}

export { LoadDB, pool }