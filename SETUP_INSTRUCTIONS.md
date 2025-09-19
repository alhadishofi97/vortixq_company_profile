# Setup Instructions

## Email Configuration Setup

Untuk mengaktifkan fungsi contact form, buat file `.env.local` di root project dengan konfigurasi berikut:

### 1. Buat file .env.local
```bash
touch .env.local
```

### 2. Tambahkan konfigurasi SMTP
```env
# SMTP Configuration for Contact Form - LarkSuite
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=your_email@larksuite.com
SMTP_PASS=2ld1pkSCpIWAVwj5
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com
```

### 3. Ganti dengan email yang valid
- Ganti `your_email@larksuite.com` dengan email LarkSuite yang valid
- Pastikan password SMTP sudah benar

### 4. Restart development server
```bash
npm run dev
```

## Alternative SMTP Providers

### Gmail SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com
```

### Outlook/Hotmail SMTP
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com
```

## Testing Contact Form

1. Buka halaman contact
2. Isi form dengan data valid
3. Klik "Send Message"
4. Cek email di `CONTACT_TO` address

## Troubleshooting

- Pastikan file `.env.local` ada di root project
- Restart server setelah mengubah konfigurasi
- Cek console untuk error messages
- Pastikan SMTP credentials valid
