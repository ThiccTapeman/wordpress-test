import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"

const SITE = "alexanderhellsten7-oraxz.wordpress.com"

export async function POST(req) {
    const body = await req.json()
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(body) // e.g. { title: "My New Post", content: "Post content" }
        }
    )

    const data = await res.json()
    return Response.json(data, { status: res.status })
}
