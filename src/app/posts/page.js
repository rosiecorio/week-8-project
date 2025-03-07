import FormButton from "@/components/FormButton"
import Link from "next/link"
import pg from "pg"
import PostForm from "@/components/PostForm"
import DeletePostButton from "@/components/DeletePostButton"

export default async function Posts({searchParams}) {
    
    const db = new pg.Pool({
        connectionString: process.env.DB_CONN
    })

    const data = await db.query(`SELECT * FROM posts`)
    const posts = data.rows
    console.log(posts)

    const query = await searchParams

    if (query.sort === 'desc') {
        posts.sort((a, b) => {
            return b.title.localeCompare(a.title)
        })
    } else if (query.sortby === 'asc') {
        posts.sort((a, b) => {
            return a.title.localeCompare(b.title)
        })
    }
    
    return (
        <>
            <h1>Posts Page</h1>
            <section className="flex flex-row justify-around">
                <div className="flex flex-row gap-5">
                    <Link href="/posts?sortby=asc">Sort by Alphabetical</Link>
                    <Link href="/posts?sortby=desc">Sort by Reverse Alphabetical</Link>
                </div>
                <FormButton><PostForm /></FormButton>
            </section>
            <div className="flex flex-row flex-wrap justify-evenly">
                {posts.map((post) => (
                    <div className="flex flex-row p-5 gap-5 w-[500px]" key={post.id}>
                        <img className="h-40" src={post.img_url}/>
                        <div className="w-80 flex-wrap">
                            <div className="flex flex-row justify-between">
                                <Link className="underline" href={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
                                <DeletePostButton id={post.id}/>
                            </div>
                            <p>{post.content}</p>                            
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}