import pg from "pg"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function CommentForm({id}) {
    
    async function handleSubmit(formData) {
        'use server'
        const db = new pg.Pool({
            connectionString: process.env.DB_CONN
        })

        const data = Object.fromEntries(formData)
        const {name, comment} = data

        await db.query(`INSERT INTO comments (name, comment, post_id) VALUES ($1, $2, $3)`, [name, comment, id])
        revalidatePath(`/posts/${id}`)
        redirect(`/posts/${id}`)

    }
    
    return (
        <form className="flex flex-col" action={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input name="name" id="name" />
            <label htmlFor="comment">Comment:</label>
            <textarea name="comment" id="comment" />
            <button type="submit">Submit</button>
        </form>
    )
}