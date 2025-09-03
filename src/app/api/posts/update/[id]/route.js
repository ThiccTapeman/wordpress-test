import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"

const SITE = "alexanderhellsten7-oraxz.wordpress.com"

export async function PUT(req, { params }) {
    const body = await req.json()
    const session = await getServerSession(authOptions)
    const { id } = params

    if (!session?.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts/${id}`,
        {
            method: "PUT", // update uses PUT or PATCH
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(body)
        }
    )

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
}
