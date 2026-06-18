"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    institutionPlaceholder: string;
    messagePlaceholder: string;
    buttonLabel: string;
  };
};

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm({ form }: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setState("sending");
    setFeedback("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        institution: formData.get("institution"),
        message: formData.get("message"),
        website: formData.get("website")
      })
    });

    const result = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      setState("error");
      setFeedback(result.error ?? "Message could not be sent. Please try again later.");
      return;
    }

    event.currentTarget.reset();
    setState("success");
    setFeedback("Message sent successfully. Thank you for getting in touch.");
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2 md:grid-cols-2">
        <Input name="name" placeholder={form.namePlaceholder} autoComplete="name" required />
        <Input name="email" type="email" placeholder={form.emailPlaceholder} autoComplete="email" required />
      </div>
      <Input name="institution" placeholder={form.institutionPlaceholder} autoComplete="organization" />
      <Textarea name="message" placeholder={form.messagePlaceholder} className="min-h-40" required />
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={state === "sending"}>
          <Send className="size-4" /> {state === "sending" ? "Sending..." : form.buttonLabel}
        </Button>
        {feedback ? (
          <p className={state === "error" ? "text-sm text-red-600" : "text-sm text-accent"} role="status">
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
