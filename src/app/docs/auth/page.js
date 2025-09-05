import CodeDoc from "@/components/CodeDoc";

export default function Auth() {
  return (
    <>
      <section className="p-4 bg-white text-black">
        <div className="container mx-auto mt-20">
          <div className="mt-10 mb-40">
            <h2 className="text-3xl md:text-5xl text-black mb-4 font-bold">
              Auth
            </h2>
            <CodeDoc
              title={"Endpoints"}
              description={
                "The application uses NextAuth.js for authentication, configured to work with WordPress OAuth2. Below are the key endpoints used in the OAuth2 flow."
              }
              code={`// src/app/api/auth/[...nextauth]/route.js

const tokenUrl = "https://public-api.wordpress.com/oauth2/token";
const authUrl = "https://public-api.wordpress.com/oauth2/authorize";
const userInfoUrl = "https://public-api.wordpress.com/rest/v1.1/me";`}></CodeDoc>
            <CodeDoc
              title={"WordPressProvider"}
              description={
                "The application uses NextAuth.js for authentication, configured to work with WordPress OAuth2. Below is the custom OAuth provider configuration for WordPress. It includes the necessary endpoints and a custom token request function to handle the OAuth2 token exchange."
              }
              code={`// src/app/api/auth/[...nextauth]/route.js
                
const WordPressProvider = {
  id: "wordpress",
  name: "WordPress",
  type: "oauth",
  clientId: process.env.WP_CLIENT_ID,
  clientSecret: process.env.WP_CLIENT_SECRET,
  authorization: {
    url: authUrl,
    params: { scope: "global", response_type: "code" },
  },
  token: {
    url: tokenUrl,
    async request(context) {
      // Custom token request exchanger function
    },
  },
  userinfo: {
    url: userInfoUrl,
  },
  profile(profile) {
    return {
      id: String(profile.ID),
      name: profile.display_name,
      email: profile.email,
    };
  },
  checks: ["state"]
}`}></CodeDoc>
            <CodeDoc
              title={"Custom Token Request Function"}
              description={
                "Below is an example of the custom token request function used in the WordPress OAuth provider configuration for NextAuth.js. It handles exchanging the authorization code for access tokens. This function constructs the request body, makes a POST request to the WordPress token endpoint, and processes the response."
              }
              code={`// src/app/api/auth/[...nextauth]/route.js

async request(context) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: context.params.code,
    redirect_uri: context.provider.callbackUrl,
    client_id: process.env.WP_CLIENT_ID,
    client_secret: process.env.WP_CLIENT_SECRET,
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const tokens = await res.json();
  if (!res.ok) {
    console.error("WP token error", tokens);
    throw new Error(tokens.error_description || "Token exchange failed");
  }

  return { tokens };
}`}></CodeDoc>
            <CodeDoc
              title={"JWT Callback"}
              description={
                "The JWT callback is used to persist the access token in the JWT token after a successful sign-in. This allows the application to use the access token for authenticated requests to the WordPress API."
              }
              code={`// src/app/api/auth/[...nextauth]/route.js

export const authOptions = {
  providers: [WordPressProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      // Gets the tokens from the token response
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      // Sets the session tokens
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      return session;
    },
  },
};`}></CodeDoc>
            <CodeDoc
              title={"Autherized to this page"}
              description={
                "This is the API route that checks what capabillities the user has on this page. It uses the access token stored in the session to make an authenticated request to the WordPress API and fetch the user's capabilities."
              }
              code={`// src/app/api/auth/capabillities/route.js
                
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const res = await fetch(
      \`https://public-api.wordpress.com/rest/v1.1/sites/\${SITE}\`,
      {
          headers: {
              Authorization: 'Bearer \${session.accessToken}'
          }
      }
  )

  const data = await res.json()

  return NextResponse.json({ capabilities: data.capabilities })
}
`}></CodeDoc>
          </div>
        </div>
      </section>
    </>
  );
}
