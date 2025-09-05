import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const SITE = "alexanderhellsten7-oraxz.wordpress.com";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.accessToken || !id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${SITE}/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
