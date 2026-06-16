import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 72, background: "#061d2f", color: "white" }}>
        <div style={{ fontSize: 28, color: "#9ad3b0" }}>Ecology | UFBA</div>
        <div style={{ marginTop: 24, fontSize: 68, fontWeight: 700 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#d8e7ef" }}>{siteConfig.title}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
