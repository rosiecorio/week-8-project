import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-blue-600 flex flex-row gap-5 pl-5 pt-2">
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
        </nav>
    )
}