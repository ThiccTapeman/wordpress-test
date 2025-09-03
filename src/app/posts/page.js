"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Posts() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data)
        } else {
          setError(data.error || data.message || "Failed to load posts")
        }
      })
  }, [])

  async function handleCreate(e) {
    e.preventDefault()
    const body = {
      title: "",
      content: ""
    }

    const res = await fetch(`/api/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    console.log("Created post:", data)

    router.push("/posts/edit/" + data.id)
  }

  return (
    <section className="p-4 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-black">WordPress Posts</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>
            Create New Post
          </button>
        </div>
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 gap-1">
          {posts.map(post => (
            <div className="p-3 px-4 bg-white rounded-xl text-black" key={post.ID || post.id}>
              <div className="flex justify-between">
                <h2 className="text-xl mb-1">{post.title.rendered || post.title}</h2>
                <div className="flex gap-2 text-sm text-gray-500">
                  <Link className="hover:text-blue-600 flex items-center gap-1 cursor-pointer" href={`/posts/edit/${post.ID || post.id}`}>
                    Edit
                  </Link>
                  <Link className="hover:text-red-600 flex items-center gap-1 cursor-pointer" href={`/posts/delete/${post.ID || post.id}`}>
                    Delete
                  </Link>
                </div>
              </div>
              <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: post.content.rendered || post.content }} />
            </div>
          )) || <p>No posts found.</p>}
        </div>
      </div>
    </section >
  )
}
