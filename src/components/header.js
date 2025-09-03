import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="p-10 bg-white text-black py-3 flex justify-between items-center shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-normal">WordPress API Integration</h1>
                    <div className="flex gap-4">
                        <Link href="/" className="text-blue-500 hover:underline">
                            Home
                        </Link>
                        <Link href="/posts" className="text-blue-500 hover:underline">
                            Posts
                        </Link>
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>

            </header>
        </>
    )
}