import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"

const SITE = "alexanderhellsten7-oraxz.wordpress.com"

export async function POST(req) {
    const body = await req.json()
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Ensure required fields exist
    const payload = {
        title: body.title || "Untitled",
        content: body.content || "",
        status: body.status || "publish"
    }

    const res = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(payload)
        }
    )

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}
