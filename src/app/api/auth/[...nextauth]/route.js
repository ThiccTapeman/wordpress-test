// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";

const tokenUrl = "https://public-api.wordpress.com/oauth2/token";
const authUrl = "https://public-api.wordpress.com/oauth2/authorize";
const userInfoUrl = "https://public-api.wordpress.com/rest/v1.1/me";

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
  checks: ["state"],
};

export const authOptions = {
  providers: [WordPressProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
