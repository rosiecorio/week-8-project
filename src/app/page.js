import pg from "pg"
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN
  })

  const lastPost = (await db.query(`SELECT * FROM posts ORDER BY ID DESC LIMIT 1`)).rows[0]
  // console.log(lastPost)
  
  return (
    <div className="flex flex-col items-center m-10">
        <h1 className="text-4xl">Dont eat the bookworm!</h1>
        <div className="flex flex-col items-center">
          <p className="text-xl text-center">An online book forum to discuss theories, share opinions, or make recommendations!</p>
          <p className="text-center text-sm w-1/2">All opinions are welcome, but not everyone is an early bird - so please dont eat the bookworms!</p>
        </div>
        <section className="flex flex-col items-center text-lg m-5 max-w-md border-white border-2 p-3 scale-110 mt-20 rounded-xl bg-gradient-to-bl from-slate-400 to-slate-600 text-black">    
          <div className="flex flex-row gap-3 mb-3">
            <p>Most recent thread:</p>
            <Link href={`/posts/${lastPost.id}`}><h2 className="underline">{lastPost.title}</h2></Link>
          </div>
          <Image  className="shadow-xl" src={lastPost.img_url} height={800} width={200} alt="image of book cover"/>
          <p className="text-center mt-3">{lastPost.content}</p>          
        </section>
    </div>
  );
}
