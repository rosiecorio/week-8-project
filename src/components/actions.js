'use server' 

import pg from "pg"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function handleCommentDelete(id) {
    const db = new pg.Pool({
        connectionString: process.env.DB_CONN
    })
    
    await db.query(`DELETE FROM comments WHERE id = ${id}`)
}

export async function handlePostDelete(id) {
    const db = new pg.Pool({
        connectionString: process.env.DB_CONN
    })
    
    await db.query(`DELETE FROM posts WHERE id = ${id}`)
}
