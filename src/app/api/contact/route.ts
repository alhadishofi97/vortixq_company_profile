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

    // SMTP Configuration with fallback values
    const host = process.env.SMTP_HOST || "smtp.larksuite.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER || "web.marketing@vortiqx.com";
    const pass = process.env.SMTP_PASS || "2ld1pkSCpIWAVwj5";
    const to = process.env.CONTACT_TO || "contact@vortiqx.com";
    const from = process.env.CONTACT_FROM || "web.marketing@vortiqx.com";

    // Debug logging
    console.log("SMTP Config:", { 
      host: host ? "✓" : "✗", 
      port, 
      user: user ? "✓" : "✗", 
      pass: pass ? "✓" : "✗", 
      to: to ? "✓" : "✗", 
      from: from ? "✓" : "✗",
      env: process.env.NODE_ENV
    });

    // Check if we have valid configuration
    if (!host || !user || !pass || !to || !from) {
      console.error("SMTP Configuration missing:", { host, user, pass, to, from });
      return NextResponse.json({ 
        ok: false, 
        error: "Konfigurasi SMTP belum lengkap. Silakan hubungi administrator." 
      }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
      secure: port === 465,
    });

    const subject = `[Contact] ${name}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pesan Baru dari Website</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Pesan Baru dari Website</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Vortiqx Company Profile</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">Informasi Pengirim</h2>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 80px; color: #666666; font-weight: bold;">Nama:</span>
                <span style="color: #333333; font-size: 16px;">${name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; width: 80px; color: #666666; font-weight: bold;">Email:</span>
                <span style="color: #333333; font-size: 16px;">${email}</span>
              </div>
              
              <div style="margin-bottom: 0;">
                <span style="display: inline-block; width: 80px; color: #666666; font-weight: bold;">Tanggal:</span>
                <span style="color: #333333; font-size: 16px;">${new Date().toLocaleString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 6px; padding: 20px;">
              <h2 style="color: #333333; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">Pesan</h2>
              <div style="color: #333333; font-size: 16px; line-height: 1.6; white-space: pre-line; background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #ff6b35;">${message}</div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #666666; margin: 0; font-size: 14px;">
              Email ini dikirim dari form contact website Vortiqx<br>
              <a href="mailto:${email}" style="color: #ff6b35; text-decoration: none;">Balas ke: ${email}</a>
            </p>
          </div>
          
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({ from, to, subject, html, replyTo: email });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    return NextResponse.json({ ok: false, error: "Gagal mengirim pesan" }, { status: 500 });
  }
}
