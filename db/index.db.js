import { config } from "dotenv"
import { Pool } from "pg"
config({ quiet: true })

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    }
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