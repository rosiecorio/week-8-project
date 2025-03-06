export default async function Page({params}) {
    
    const query = await params
    
    return (
        <>
            <h1>Page for post number {query.id}</h1>
        </>
    )
}