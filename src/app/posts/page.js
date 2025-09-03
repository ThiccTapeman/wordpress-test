"use client"
import { useEffect, useState } from "react"

export default function Posts() {
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

  return (
    <div>
      <h1 className="">WordPress Posts</h1>
      {error && <p>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.ID || post.id}>
            <div className="p-3 bg-white text-black">
              <h2 className="text-xl mb-1">{post.title.rendered || post.title}</h2>
              <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: post.content.rendered || post.content }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
