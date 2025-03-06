import Link from "next/link"
import pg from "pg"

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
            <section className="flex flex-row justify-between">
                <div>
                    <Link href="/posts?sortby=asc">Sort by Alphabetical</Link>
                    <Link href="/posts?sortby=desc">Sort by Reverse Alphabetical</Link>
                </div>
                <button>Add New Post</button>
            </section>
            <div>
                {posts.map((post) => (
                    <div className="flex flex-row" key={post.id}>
                        <img className="h-40" src={post.img_url}/>
                        <div>
                            <Link href={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
                            <p>{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}