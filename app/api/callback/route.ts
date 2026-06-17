import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const PROVIDER = "github";

function popupResponse(status: "success" | "error", payload: Record<string, string>) {
  const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(payload)}`;

  return new NextResponse(
    `<!doctype html><html><body><script>
      const message = ${JSON.stringify(message)};
      const targetOrigin = window.location.origin;

      try {
        window.localStorage.setItem("decap-cms-oauth-result", message);
        if (message.startsWith("authorization:github:success:")) {
          const payload = JSON.parse(message.replace(/^authorization:github:success:/, ""));
          if (payload.token) {
            window.localStorage.setItem("decap-cms-user", JSON.stringify({ backendName: "github", token: payload.token }));
          }
        }
      } catch (error) {}

      if (window.opener) {
        window.opener.postMessage(message, targetOrigin);
        window.setTimeout(() => window.close(), 250);
      } else {
        window.location.replace("/admin");
      }
    </script></body></html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
      }
    }
  );
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get("github_oauth_state")?.value;

  if (!clientId || !clientSecret) {
    return popupResponse("error", { message: "Missing GitHub OAuth environment variables" });
  }

  if (!code || !state || !storedState || state !== storedState) {
    return popupResponse("error", { message: "Invalid OAuth state" });
  }

  const redirectUri = new URL("/api/callback", request.url).toString();
  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri
    })
  });

  const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string; error_description?: string };

  if (!tokenResponse.ok || !tokenData.access_token) {
    return popupResponse("error", { message: tokenData.error_description ?? tokenData.error ?? "Token exchange failed" });
  }

  const response = popupResponse("success", { token: tokenData.access_token });
  response.cookies.delete("github_oauth_state");
  return response;
}
