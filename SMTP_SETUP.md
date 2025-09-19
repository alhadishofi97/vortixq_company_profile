# SMTP Configuration Setup

## LarkSuite SMTP Configuration

Berdasarkan konfigurasi LarkSuite yang tersedia, berikut adalah setup lengkap untuk contact form:

### 1. Buat File .env.local

Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
# LarkSuite SMTP Configuration
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=your_larksuite_email@larksuite.com
SMTP_PASS=2ld1pkSCpIWAVwj5
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com

# Alternative port (STARTTLS)
# SMTP_PORT=587
```

### 2. Konfigurasi Server Details

**SMTP Settings:**
- **Host**: `smtp.larksuite.com`
- **Port (SSL)**: `465` (Recommended)
- **Port (STARTTLS)**: `587` (Alternative)
- **Security**: SSL/TLS
- **Authentication**: Required

**IMAP Settings:**
- **Host**: `imap.larksuite.com`
- **Port (SSL)**: `993`

### 3. SMTP Restrictions

**Sending Limits:**
- **Frequency**: 200 emails per 100 seconds
- **Daily Limit**: 450 emails per day
- **Rate Limiting**: Yes

### 4. Testing Configuration

Untuk test konfigurasi SMTP:

```bash
# Test email sending
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### 5. Troubleshooting

**Common Issues:**

1. **Authentication Failed**
   - Pastikan email dan password benar
   - Cek apakah menggunakan App Password (bukan password biasa)

2. **Connection Timeout**
   - Coba ganti port dari 465 ke 587
   - Pastikan firewall tidak memblokir koneksi

3. **Rate Limited**
   - Tunggu beberapa saat sebelum mengirim email lagi
   - Cek daily limit (450 emails/hari)

4. **SSL/TLS Error**
   - Pastikan menggunakan port 465 untuk SSL
   - Atau port 587 untuk STARTTLS

### 6. Alternative SMTP Providers

Jika LarkSuite tidak bekerja, gunakan provider lain:

#### Gmail SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com
```

#### Outlook/Hotmail SMTP
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com
```

#### Custom SMTP
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_password
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@yourdomain.com
```

### 7. Security Notes

- Jangan commit file `.env.local` ke repository
- Gunakan App Password untuk Gmail
- Pastikan SMTP credentials aman
- Monitor daily limits untuk menghindari spam

### 8. Monitoring

Untuk monitoring email yang terkirim:
- Cek log di console development server
- Monitor daily limit (450 emails/hari)
- Cek rate limiting (200 emails/100 detik)
