"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthStatus() {
    const { data: session, status } = useSession()

    console.log("Session status:", status)
    console.log("Session data:", session)

    if (status === "loading") return <p>Loading...</p>

    if (!session) {
        return <button onClick={() => signIn("wordpress")}>Login</button>
    }

    return (
        <div>
            <p>Signed in as {session.user?.email}</p>
            <p>Access token: {session.accessToken}</p>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}
