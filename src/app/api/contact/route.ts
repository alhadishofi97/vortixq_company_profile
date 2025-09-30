import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function buildEmailHtml(name: string, email: string, message: string) {
  const safeName = name || "-";
  const safeEmail = email || "-";
  const safeMessage = (message || "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  return `<!DOCTYPE html>
  <html lang="id">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Contact</title>
    <style>
      body { margin:0; padding:0; background:#f5f5f5; }
      table { border-collapse:collapse; }
      .container { width:100%; background:#f5f5f5; padding:20px 0; }
      .card { max-width:700px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.06); }
      .banner { background:linear-gradient(135deg,#ff6b35,#ff8c42); color:#fff; text-align:center; padding:28px 16px; }
      .banner h1 { margin:0; font-size:24px; line-height:1.2; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; }
      .banner p { margin:6px 0 0 0; font-size:15px; opacity:.95; }
      .section { padding:24px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#111827; }
      .title { font-size:18px; font-weight:700; margin:0 0 14px 0; padding-bottom:8px; border-bottom:2px solid #ff6b35; }
      .row { width:100%; margin:0 0 10px 0; }
      .label { font-weight:600; color:#374151; display:inline-block; min-width:68px; }
      .value { color:#111827; }
      .link { color:#2563eb; text-decoration:underline; }
      .msgwrap { background:#f8f9fa; border:1px solid #e5e7eb; border-radius:6px; padding:14px 16px; position:relative; }
      .accent { position:absolute; left:0; top:0; bottom:0; width:4px; background:#ff6b35; border-radius:6px 0 0 6px; }
      .message { margin-left:10px; line-height:1.6; white-space:normal; word-break:break-word; }
      @media (max-width:640px){ .section{ padding:18px; } .banner h1{ font-size:22px; } }
    </style>
  </head>
  <body>
    <table role="presentation" class="container" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td class="banner">
                <h1>Pesan Baru dari Website</h1>
                <p>Vortiqx Company Profile</p>
              </td>
            </tr>
            <tr>
              <td class="section">
                <div class="title">Informasi Pengirim</div>
                <div class="row"><span class="label">Nama:</span> <span class="value">${safeName}</span></div>
                <div class="row"><span class="label">Email:</span> <a class="link" href="mailto:${safeEmail}">${safeEmail}</a></div>
              </td>
            </tr>
            <tr>
              <td class="section">
                <div class="title">Pesan</div>
                <div class="msgwrap">
                  <div class="accent"></div>
                  <div class="message">${safeMessage}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

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
    const html = buildEmailHtml(name, email, message);

    await transporter.sendMail({ from, to, subject, html, replyTo: email });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    return NextResponse.json({ ok: false, error: "Gagal mengirim pesan" }, { status: 500 });
  }
}
