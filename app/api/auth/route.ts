import { NextRequest, NextResponse } from "next/server";

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";

function htmlResponse(body: string) {
  return new NextResponse(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
    }
  });
}

function oauthError(provider: string, message: string) {
  const payload = `authorization:${provider}:error:${JSON.stringify({ message })}`;
  return htmlResponse(`<!doctype html><html><body><script>
    const message = ${JSON.stringify(payload)};
    const targetOrigin = window.location.origin;
    if (window.opener) {
      window.opener.postMessage(message, targetOrigin);
      window.close();
    } else {
      document.body.textContent = ${JSON.stringify(message)};
    }
  </script></body></html>`);
}

export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const provider = request.nextUrl.searchParams.get("provider") ?? "github";

  if (provider !== "github") {
    return oauthError(provider, "Unsupported OAuth provider");
  }

  if (!clientId) {
    return oauthError(provider, "Missing GITHUB_CLIENT_ID environment variable.");
  }

  const state = crypto.randomUUID();
  const redirectUri = new URL("/api/callback", request.url).toString();
  const scope = request.nextUrl.searchParams.get("scope") ?? "repo";
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("state", state);

  const handshake = `authorizing:${provider}`;
  const response = htmlResponse(`<!doctype html><html><body><script>
    const handshake = ${JSON.stringify(handshake)};
    const authorizeUrl = ${JSON.stringify(authorizeUrl.toString())};
    const targetOrigin = window.location.origin;
    let redirected = false;

    function redirectToGitHub() {
      if (redirected) return;
      redirected = true;
      window.location.href = authorizeUrl;
    }

    if (window.opener) {
      window.addEventListener("message", function receiveHandshake(event) {
        if (event.origin === targetOrigin && event.data === handshake) {
          window.removeEventListener("message", receiveHandshake, false);
          redirectToGitHub();
        }
      }, false);
      window.opener.postMessage(handshake, targetOrigin);
      window.setTimeout(redirectToGitHub, 1500);
    } else {
      redirectToGitHub();
    }
  </script><p>Redirecting to GitHub...</p></body></html>`);

  response.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 10 * 60,
    path: "/"
  });

  return response;
}
