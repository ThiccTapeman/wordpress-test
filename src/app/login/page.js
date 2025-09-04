"use client"
import ActionButton from "@/components/ActionButton";
import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthStatus() {
    const { data: session, status } = useSession()

    if (status === "loading") return <p>Loading...</p>

    let loginContent;
    if (!session) {
        loginContent = (
            <>
                <h2 className="text-xl md:text-2xl mb-10 mt-5 text-center font-bold">Login using wordpress</h2>
                <ActionButton button onClick={() => signIn("wordpress")} w="w-full" additionalClasses="justify-center flex">Login</ActionButton>
            </>
        )
    } else {
        loginContent = (<div>
            <h2 className="font-bold text-xl md:text-2xl mb-10 mt-5 text-center">You&apos;re already logged in.</h2>
            <div className="text-gray-500 mb-10 text-sm">
                <h3 className="text-lg">Login info:</h3>
                <p>Display name: {session.user?.name}</p>
                <p>Email: {session.user?.email}</p>
            </div>

            <div className="flex gap-3">
                <ActionButton button onClick={() => signOut()} w="w-full" additionalClasses="justify-center flex">Logout</ActionButton>
                <ActionButton href={"posts"} secondary w="w-full md:w-1/2" additionalClasses="justify-center flex">Posts</ActionButton>

            </div>
        </div>)
    }

    return (
        <section className="p-4 bg-white min-h-screen text-black">
            <div className="container mx-auto mt-30">
                <div className="flex justify-center items-center mb-4 w-full">
                    <div className="bg-white p-10 px-12 rounded-xl w-full lg:w-1/2 shadow-sm inset-shadow-sm">
                        {loginContent}
                    </div>
                </div>
            </div>
        </section>
    )
}
