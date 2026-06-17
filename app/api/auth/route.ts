import { NextRequest, NextResponse } from "next/server";

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";

export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse("Missing GITHUB_CLIENT_ID environment variable.", { status: 500 });
  }

  const state = crypto.randomUUID();
  const redirectUri = new URL("/api/callback", request.url).toString();
  const scope = request.nextUrl.searchParams.get("scope") ?? "repo";
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 10 * 60,
    path: "/"
  });

  return response;
}
