import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const SITE = "alexanderhellsten7-oraxz.wordpress.com";

export async function GET() {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${SITE}/posts`
  );
  const data = await res.json();
  return Response.json(data["posts"]);
}
