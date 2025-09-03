import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const SITE = "alexanderhellsten7-oraxz.wordpress.com"

export async function GET() {
  const session = await getServerSession(authOptions)

  console.log("Access Token", session)
  console.log("Site", SITE)

  if (!session || !session.accessToken) {
    const res = await fetch("https://public-api.wordpress.com/rest/v1.1/sites/alexanderhellsten7-oraxz.wordpress.com/posts")
    const data = await res.json()
    return Response.json(data["posts"])
  }

  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    }
  )

  const data = await res.json()
  return Response.json(data)
}

