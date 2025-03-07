import pg from "pg"
import Image from "next/image";

export default async function Page() {
  
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN
  })

  const lastPost = (await db.query(`SELECT * FROM posts ORDER BY ID DESC LIMIT 1`)).rows[0]
  console.log(lastPost)
  
  return (
    <div className="flex flex-col items-center m-10">
        <h1 className="text-4xl">Dont eat the bookworm!</h1>
        <p className="text-xl">An online book forum to discuss theories, share opinions, or make recommendations!</p>
        <section className="flex flex-col items-center text-lg m-5">  
          <p>Most recent post:</p> 
          <div className="flex flex-col items-center">
            <h2>{lastPost.title}</h2>
            <p>{lastPost.content}</p>
            <Image src={lastPost.img_url} height={400} width={100} alt="image of book cover"/>
          </div>
        </section>
    </div>
  );
}
