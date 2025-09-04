import { getServerSession } from "next-auth"
import { authOptions } from "../[...nextauth]/route"
import { NextResponse } from "next/server"

const SITE = "alexanderhellsten7-oraxz.wordpress.com"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(
        `https://public-api.wordpress.com/rest/v1.1/sites/${SITE}`,
        {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        }
    )

    const data = await res.json()

    return NextResponse.json({ capabilities: data.capabilities })
}