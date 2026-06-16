import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <div id="nc-root" />
      <noscript>Ative JavaScript para acessar o painel de edição de conteúdo.</noscript>
      <Script src="https://unpkg.com/decap-cms@^3.6.0/dist/decap-cms.js" strategy="afterInteractive" />
    </main>
  );
}
