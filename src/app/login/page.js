"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthStatus() {
    const { data: session, status } = useSession()

    console.log("Session status:", status)
    console.log("Session data:", session)

    if (status === "loading") return <p>Loading...</p>

    let loginContent;
    if (!session) {
        loginContent = (
            <>
                <h2 className="">Login using wordpress</h2>
                <button onClick={() => signIn("wordpress")} className="w-full bg-white rounded-2xl text-black">Login</button>
            </>
        )
    } else {
        loginContent = (<div>
            <h2>You&apos;re already logged in.</h2>
            <button onClick={() => signOut()}>Logout</button>
        </div>)
    }

    return (
        <section className="p-4 bg-gray-100 min-h-screen text-black">
            <div className="container mx-auto">
                <h1 className="text-2xl text-black mb-4">Authentication Status</h1>
                {loginContent}
            </div>
        </section>
    )
}
