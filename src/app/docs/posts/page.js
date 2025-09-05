import React from "react";
import CodeDoc from "@/components/CodeDoc";

const getByIdCode = `
// src/app/api/posts/[id]/route.js

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.accessToken || !id) {
	return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
	\`https://public-api.wordpress.com/wp/v2/sites/\${SITE}/posts/\${id}\`,
	{
	  headers: {
		Authorization: 'Bearer \${session.accessToken}',
	  },
	}
  );

  const data = await res.json();
  return NextResponse.json(data);
}`;

const getAllCode = `
// src/app/api/posts/route.js

export async function GET() {
  const session = await getServerSession(authOptions);

  const res = await fetch(
	\`https://public-api.wordpress.com/rest/v1.1/sites/\${SITE}/posts\`
  );
  const data = await res.json();
  return Response.json(data["posts"]);
}
`;

const deleteByIdCode = `
// src/app/api/posts/delete/[id]/route.js

export async function DELETE(req, { params }) {
	const session = await getServerSession(authOptions)
	const { id } = params

	if (!session || !session.accessToken) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
	}

	const res = await fetch(
		\`https://public-api.wordpress.com/wp/v2/sites/\${SITE}/posts/\${id}\`,
		{
			method: "DELETE",
			headers: {
				Authorization: \`Bearer \${session.accessToken}\`
			}
		}
	)

	const data = await res.json()
	return Response.json(data)
}`;

const createPostCode = `
// src/app/api/posts/create/route.js

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
		\`https://public-api.wordpress.com/wp/v2/sites/\${SITE}/posts\`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: \`Bearer \${session.accessToken}\`
			},
			body: JSON.stringify(payload)
		}
	)

	const data = await res.json()
	return NextResponse.json(data, { status: res.status })
}`;

export default function PostsPage() {
  return (
    <section className="p-4 bg-white text-black min-h-screen">
      <div className="container mx-auto mt-20">
        <h1 className="text-3xl md:text-5xl font-bold">Posts</h1>
        <CodeDoc
          code={getAllCode}
          title="Get all posts"
          description={
            "This route fetches all the posts that's published in a wordpress site. It makes a request to the WordPress API to retrieve the list of posts."
          }></CodeDoc>
        <CodeDoc
          code={getByIdCode}
          title="Get a Post by ID"
          description="This is the API route that fetches a specific post by its ID. To get by a specific id you need to use the token to see if the user that's trying to access it can access it. So it uses the access token stored in the session to make an authenticated request to the WordPress API and retrieve the post data."
        />
        <CodeDoc
          title={"Create a Post"}
          description={
            "This is the API route that creates a new post. It uses the access token stored in the session to make an authenticated request to the WordPress API and create a new post with the provided title and content."
          }
          code={createPostCode}></CodeDoc>
        <CodeDoc
          title={"Delete a Post by ID"}
          description={
            "This is the API route that deletes a specific post by its ID. It uses the access token stored in the session to make an authenticated request to the WordPress API and delete the post."
          }
          code={deleteByIdCode}></CodeDoc>
      </div>
    </section>
  );
}
