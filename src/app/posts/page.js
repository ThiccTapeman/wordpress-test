"use client"
import ActionButton from "@/components/ActionButton"
import { Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Posts() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [canEdit, setCanEdit] = useState(false)

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

  useEffect(() => {
    fetch("/api/auth/capabillities")
      .then(res => res.json())
      .then(data => {
        setCanEdit(data.capabilities?.edit_posts === true)
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
    <section className="p-4 bg-white text-black min-h-screen">
      <div className="container mx-auto mt-30">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">WordPress Posts</h1>
          {canEdit &&
            <ActionButton button onClick={handleCreate} w="w-full md:w-max" additionalClasses="flex justify-center rounded-xl"> Create New Post</ActionButton>
          }
        </div>
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 gap-10">
          {posts.map(post => (
            <div className="p-10 px-12 bg-white rounded-xl text-black inset-shadow-sm shadow-sm" key={post.ID || post.id}>
              <div className="flex justify-between flex-col-reverse md:flex-row w-full">
                <h2 className="text-xl md:text-2xl font-bold mb-1 w-full">{post.title.rendered || post.title}</h2>
                {canEdit &&
                  <div className="flex gap-4 text-sm text-gray-500 relative h-max w-full md:w-max mb-5 md:mb-0">
                    <ActionButton href={`/posts/edit/${post.ID || post.id}`} secondary w={"w-full md:w-max"} additionalClasses="rounded-full h-max">Edit</ActionButton>
                    <ActionButton href={`/posts/delete/${post.ID || post.id}`} secondaryInverted p="p-3" additionalClasses="rounded-full hover:bg-red-400 flex justify-center items-center"><Trash height={15} /></ActionButton>
                  </div>
                }
              </div>
              <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: post.content.rendered || post.content }} />
            </div>
          )) || <p>No posts found.</p>}
        </div>
      </div>
    </section >
  )
}
