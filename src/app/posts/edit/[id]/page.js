"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import React from "react"

export default function EditPostPage({ params }) {
    const router = useRouter()
    const [post, setPost] = useState(null)
    const { id } = React.use(params)

    useEffect(() => {
        if (!id) return
        fetch("/api/posts/get/" + id)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const body = {
            title: formData.get("title"),
            content: formData.get("content")
        }

        const res = await fetch(`/api/posts/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const data = await res.json()
        router.push("/posts")
    }

    return (
        <section className="p-4 bg-gray-100 min-h-screen text-black">
            <div className="container mx-auto">
                <h1 className="text-2xl text-black">Edit Post</h1>
                {post && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                        <input
                            type="text"
                            name="title"
                            defaultValue={post.title?.rendered || post.title}
                            className="block border p-2 mb-2"
                        />
                        <textarea
                            name="content"
                            defaultValue={post.content?.rendered || post.content}
                            className="block border p-2 mb-2"
                        ></textarea>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                            Update Post
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}
