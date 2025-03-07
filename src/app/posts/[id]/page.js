import pg from "pg"
import Image from "next/image"
import DeleteCommentButton from "@/components/DeleteButton"
import Link from "next/link"
import FormButton from "@/components/FormButton"
import CommentForm from "@/components/CommentForm"

export default async function Page({params}) {
    
    const db = new pg.Pool({
        connectionString: process.env.DB_CONN
    })

    const {id} = await params

    const commentData = await db.query(`SELECT * FROM comments WHERE post_id = $1`, [id])
    const comments = commentData.rows
    // console.log(comments)

    const postData = await db.query(`SELECT * FROM posts WHERE id = $1`, [id])
    const post = postData.rows[0]
    // console.log(post)

    
    return (
        <section className="flex flex-col items-center">
            <section className="border-white border-2 max-w-lg m-5 flex flex-col items-center gap-5 p-3">
                <h2>{post.title}</h2>
                <h3>{post.content}</h3>
            </section>
            <Image src={post.img_url} alt="book cover image" height={100} width={200}/>
            <section className="flex flex-col items-center m-5">
                {comments.map((comment) => (
                    <div className="border-white border-2 w-80 p-3 flex flex-col items-center rounded-2xl" key={comment.id}>
                        <DeleteCommentButton id={comment.id} />
                        <h2>{comment.name}</h2>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </section>
            <div className="border-white border-2 w-fit h-fit p-2 flex items-center justify-center rounded-xl">
                <FormButton text={"Add Comment"}><CommentForm id={id}/></FormButton>
            </div>        
        </section>
    )
}