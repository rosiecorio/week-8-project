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
        const {title, content, img_url} = data

        await db.query(`INSERT INTO posts (title, content, img_url) VALUES ($1, $2, $3)`, [title, content, img_url])
        revalidatePath(`/posts`)
        redirect(`/posts`)

    }
    
    return (
        <form className="flex flex-col absolute bg-gray-400 p-3" action={handleSubmit}>
            <label htmlFor="title">Thread Title:</label>
            <input className="text-black" name="title" id="title" required/>
            <label htmlFor="img_url">Book Image Link:</label>
            <input className="text-black" name="img_url" id="img_url" required/>
            <label htmlFor="content">Content:</label>
            <textarea className="text-black" name="content" id="content" required/>
            <button type="submit">Submit</button>
        </form>
    )
}