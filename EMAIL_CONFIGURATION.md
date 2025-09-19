# Email Configuration untuk Contact Form

## Konfigurasi SMTP LarkSuite

Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
# SMTP Configuration for Contact Form - LarkSuite
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=your_email@larksuite.com
SMTP_PASS=2ld1pkSCpIWAVwj5
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com
```

## Informasi SMTP LarkSuite:
- **SMTP address**: `smtp.larksuite.com`
- **SMTP port (SSL)**: `465`
- **IMAP address**: `imap.larksuite.com`
- **IMAP/SMTP password**: `2ld1pkSCpIWAVwj5`
- **SMTP port (starttls)**: `587`
- **IMAP port (SSL)**: `993`

## Batasan Pengiriman:
- **Sending frequency**: 200 emails/100 seconds
- **Daily limit**: 450 emails per hari

## Langkah-langkah:
1. Buat file `.env.local` di root project
2. Copy konfigurasi di atas ke file tersebut
3. Ganti `your_email@larksuite.com` dengan email LarkSuite yang valid
4. Restart development server: `npm run dev`