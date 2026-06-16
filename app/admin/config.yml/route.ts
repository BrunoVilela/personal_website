import { readFileSync } from "fs";
import path from "path";

export function GET() {
  const configPath = path.join(process.cwd(), "public/admin/config.yml");
  const body = readFileSync(configPath, "utf8");
  return new Response(body, {
    headers: {
      "content-type": "text/yaml; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
