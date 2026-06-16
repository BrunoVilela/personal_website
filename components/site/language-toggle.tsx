"use client";

import Script from "next/script";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement?: new (options: Record<string, unknown>, element: string) => unknown } };
    googleTranslateElementInit?: () => void;
  }
}

export function LanguageToggle() {
  function translateToPortuguese() {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (!select) {
      window.setTimeout(translateToPortuguese, 500);
      return;
    }
    select.value = "pt";
    select.dispatchEvent(new Event("change"));
  }

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`window.googleTranslateElementInit = function() {
          new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'pt,en', autoDisplay: false }, 'google_translate_element');
        };`}
      </Script>
      <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      <Button type="button" variant="outline" size="sm" onClick={translateToPortuguese} className="hidden sm:inline-flex">
        <Languages /> Português
      </Button>
      <Button type="button" aria-label="Translate to Portuguese" variant="ghost" size="icon" onClick={translateToPortuguese} className="sm:hidden">
        <Languages />
      </Button>
    </>
  );
}
