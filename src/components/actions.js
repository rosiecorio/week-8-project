'use server' 

import pg from "pg"

export async function handleDelete(id) {
    const db = new pg.Pool({
        connectionString: process.env.DB_CONN
    })
    
    await db.query(`DELETE FROM comments WHERE id = ${id}`)
}