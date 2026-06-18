import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? "bvilela.bv@gmail.com";
const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM ?? "Website contact <onboarding@resend.dev>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

type ContactPayload = {
  name?: string;
  email?: string;
  institution?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const institution = clean(payload.institution);
  const message = clean(payload.message);
  const website = clean(payload.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in name, email and message." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please use bruno.vilela@ufba.br while the contact form is being configured." },
      { status: 503 }
    );
  }

  const subject = `Website contact: ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Institution: ${institution || "Not provided"}`,
    "",
    message
  ].join("\n");
  const html = `
    <h2>New message from bvilela.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Institution:</strong> ${escapeHtml(institution || "Not provided")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: CONTACT_EMAIL_FROM,
      to: [CONTACT_EMAIL_TO],
      reply_to: email,
      subject,
      text,
      html
    })
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Contact email failed", details);
    return NextResponse.json({ error: "Message could not be sent. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
