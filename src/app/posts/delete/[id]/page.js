"use client"
import { useRouter } from "next/navigation"
import React from "react"

export default function DeletePostPage({ params }) {
    const router = useRouter()
    const { id } = React.use(params)

    async function handleDelete() {
        const res = await fetch(`/api/posts/delete/${id}`, {
            method: "DELETE"
        })

        if (res.ok) {
            // redirect to posts list after delete
            router.push("/posts")
        } else {
            const error = await res.json()
            console.error("Delete failed:", error)
        }
    }

    return (
        <section className="p-4 bg-gray-100 min-h-screen text-black">
            <div className="container mx-auto">
                <h1 className="text-2xl">Delete Post {id}</h1>
                <p className="mt-2">Are you sure you want to delete this post?</p>
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => router.push("/posts")}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    )
}
