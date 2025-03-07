import FormButton from "@/components/FormButton"
import Link from "next/link"
import pg from "pg"
import PostForm from "@/components/PostForm"
import DeletePostButton from "@/components/DeletePostButton"
import Alphabetical from "@/components/Alphabetical"

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
    } else if (query.sortby === 'new') {
        posts.reverse()
    }
    
    
    return (
        <section className="text-white">
            <section className="flex flex-row justify-around bg-blue-600">
                <div className="flex flex-row gap-4">
                    {/* <form className="text-black" action={onSubmit}>
                        <label className="text-white mx-2" htmlFor="dropdown">Sort By:</label>
                        <select className="text-sm" id="dropdown" placeholder="default">
                            <option>{<Link href="/posts?sortby=asc">A-Z</Link>}</option>
                            <option><Link href="/posts?sortby=desc">Z-A</Link></option>
                            <option><Link href="/posts?sortby=new">Most Recent</Link></option>
                            <option><Link href="/posts">Default</Link></option>
                        </select>
                        <button type="submit">Select</button>
                    </form> */}

                    <p>Sort By:</p>
                    <Link href="/posts?sortby=asc">A-Z</Link>
                    <Link href="/posts?sortby=desc">Z-A</Link>
                    <Link href="/posts?sortby=new">Most Recent</Link>
                    <Link href="/posts">Default</Link>
                </div>
                <FormButton text={"Add Post"}><PostForm /></FormButton>
            </section>
            <h1 className="text-center my-5 text-3xl">Threads</h1>
            <div className="flex flex-row flex-wrap justify-evenly">
                {posts.map((post) => (
                    <div className="flex flex-row p-3 gap-5 w-[500px] bg-gradient-to-br from-purple-600 to-blue-600 my-5 rounded-xl hover:text-red-400" key={post.id}>
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
        </section>
    )
}