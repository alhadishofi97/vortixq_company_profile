# Konfigurasi Email Contact Form

## Overview
Contact form telah dikonfigurasi untuk menggunakan LarkSuite SMTP dengan konfigurasi berikut:

## Konfigurasi SMTP LarkSuite
- **SMTP Host:** `smtp.larksuite.com`
- **SMTP Port:** `465` (SSL)
- **IMAP Host:** `imap.larksuite.com`
- **IMAP Port:** `993` (SSL)
- **SMTP Port (STARTTLS):** `587`

## Email Configuration
- **Sender Email:** `web.marketing@vortiqx.com`
- **Recipient Email:** `contact@vortiqx.com`
- **Password:** `2ld1pkSCpIWAVwj5`

## Rate Limiting
- **Sending Frequency:** 200 emails per 100 seconds
- **Daily Limit:** 450 emails per day

## Environment Variables
File `.env.local` berisi konfigurasi berikut:

```env
# SMTP Configuration untuk LarkSuite
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=web.marketing@vortiqx.com
SMTP_PASS=2ld1pkSCpIWAVwj5

# Email Configuration
CONTACT_FROM=web.marketing@vortiqx.com
CONTACT_TO=contact@vortiqx.com

# Rate Limiting (sesuai dengan konfigurasi LarkSuite)
SMTP_RATE_LIMIT=200
SMTP_RATE_WINDOW=100
SMTP_DAILY_LIMIT=450
```

## Features yang Diimplementasikan

### 1. Rate Limiting
- Implementasi rate limiting 200 email per 100 detik
- Menggunakan IP-based tracking
- Response 429 jika melebihi limit

### 2. Email Template
- Template HTML yang profesional
- Informasi lengkap: nama, email, tanggal, pesan
- Styling yang konsisten dengan brand Vortiqx

### 3. Error Handling
- Validasi email format
- Validasi field wajib
- Error handling untuk SMTP connection
- User-friendly error messages

### 4. Security
- TLS configuration untuk LarkSuite
- Reply-to header untuk memudahkan response
- Input sanitization

### 5. Logging & Monitoring
- Console logging untuk tracking email delivery
- Log informasi detail: messageId, timestamp, user data
- Rate limiting warnings
- Error logging dengan context lengkap
- Network error tracking

## Logging & Monitoring

### Console Logs yang Tersedia

#### 1. Success Logs
```javascript
// Frontend (ContactView.tsx)
console.log('✅ Email berhasil terkirim:', {
  name: 'John Doe',
  email: 'john@example.com',
  timestamp: '2024-01-01T12:00:00.000Z',
  messageId: 'abc123-def456'
});

// Backend (API route)
console.log('✅ Email berhasil dikirim:', {
  messageId: 'abc123-def456',
  from: 'web.marketing@vortiqx.com',
  to: 'contact@vortiqx.com',
  subject: '[Contact Form] Pesan dari John Doe',
  name: 'John Doe',
  email: 'john@example.com',
  timestamp: '2024-01-01T12:00:00.000Z'
});
```

#### 2. Error Logs
```javascript
// Rate limiting
console.warn('⚠️ Rate limit exceeded:', {
  clientIP: '192.168.1.1',
  name: 'John Doe',
  email: 'john@example.com',
  timestamp: '2024-01-01T12:00:00.000Z'
});

// SMTP configuration missing
console.error('❌ SMTP configuration missing:', {
  host: true,
  user: true,
  pass: false, // Missing password
  to: true,
  from: true,
  timestamp: '2024-01-01T12:00:00.000Z'
});

// Network errors
console.error('❌ Network error saat mengirim email:', {
  error: 'Connection timeout',
  timestamp: '2024-01-01T12:00:00.000Z'
});
```

#### 3. Process Logs
```javascript
// Email process started
console.log('📧 Memulai proses pengiriman email:', {
  name: 'John Doe',
  email: 'john@example.com',
  from: 'web.marketing@vortiqx.com',
  to: 'contact@vortiqx.com',
  timestamp: '2024-01-01T12:00:00.000Z'
});
```

### Monitoring Tips
1. **Development**: Buka browser console untuk melihat frontend logs
2. **Production**: Monitor server logs untuk backend logs
3. **Rate Limiting**: Watch untuk warning logs jika ada spam attempts
4. **Error Tracking**: Monitor error logs untuk troubleshooting

## Testing
Konfigurasi telah ditest dan berhasil mengirim email test ke `contact@vortiqx.com`.

## Troubleshooting
Jika ada masalah dengan pengiriman email:

1. **Check Environment Variables**
   - Pastikan file `.env.local` ada dan berisi konfigurasi yang benar
   - Restart development server setelah mengubah environment variables

2. **Verify SMTP Credentials**
   - Pastikan username dan password LarkSuite masih valid
   - Check apakah account memiliki permission untuk send email

3. **Network Issues**
   - Pastikan port 465 dapat diakses
   - Check firewall settings

4. **Rate Limiting**
   - Jika mendapat error 429, tunggu beberapa saat sebelum mencoba lagi
   - Monitor daily limit (450 emails per day)

## File yang Dimodifikasi
- `src/app/api/contact/route.ts` - API endpoint dengan rate limiting dan konfigurasi LarkSuite
- `CONTACT_ENV_EXAMPLE.txt` - Contoh konfigurasi environment variables
- `.env.local` - Konfigurasi environment variables (tidak di-commit ke git)

## Next Steps
1. Deploy ke production dengan environment variables yang sesuai
2. Monitor email delivery dan rate limiting
3. Consider implementasi logging untuk tracking email delivery
4. Setup monitoring untuk daily email limits
