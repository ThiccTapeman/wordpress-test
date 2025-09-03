import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"

const SITE = "alexanderhellsten7-oraxz.wordpress.com"

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions)
    const { id } = params

    if (!session || !session.accessToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const res = await fetch(
        `https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        }
    )

    const data = await res.json()
    return Response.json(data)
}
