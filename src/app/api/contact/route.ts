import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Semua field wajib diisi" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email tidak valid" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;
    const from = process.env.CONTACT_FROM || user;

    if (!host || !user || !pass || !to || !from) {
      return NextResponse.json({ ok: false, error: "Konfigurasi SMTP belum lengkap" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
      secure: port === 465,
    });

    const subject = `[Contact] ${name}`;
    const html = `
      <h2>Pesan Baru dari Website</h2>
      <p><b>Nama:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Pesan:</b></p>
      <p style="white-space:pre-line">${message}</p>
    `;

    await transporter.sendMail({ from, to, subject, html, replyTo: email });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    return NextResponse.json({ ok: false, error: "Gagal mengirim pesan" }, { status: 500 });
  }
}
