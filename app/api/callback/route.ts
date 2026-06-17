import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

function popupResponse(message: string) {
  return new NextResponse(
    `<!doctype html><html><body><script>
      if (window.opener) {
        window.opener.postMessage(${JSON.stringify(message)}, "*");
        window.close();
      } else {
        document.body.textContent = "Authentication finished. You can close this window.";
      }
    </script></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get("github_oauth_state")?.value;

  if (!clientId || !clientSecret) {
    return popupResponse("authorization:github:error:Missing GitHub OAuth environment variables");
  }

  if (!code || !state || !storedState || state !== storedState) {
    return popupResponse("authorization:github:error:Invalid OAuth state");
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
    return popupResponse(`authorization:github:error:${tokenData.error_description ?? tokenData.error ?? "Token exchange failed"}`);
  }

  const message = `authorization:github:success:${JSON.stringify({ token: tokenData.access_token })}`;
  const response = popupResponse(message);
  response.cookies.delete("github_oauth_state");
  return response;
}
