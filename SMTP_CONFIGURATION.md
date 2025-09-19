# Konfigurasi SMTP LarkSuite

## Konfigurasi Berdasarkan Screenshot

Berdasarkan screenshot konfigurasi SMTP LarkSuite yang diberikan:

### 📧 **Konfigurasi SMTP LarkSuite**
```
SMTP Address: smtp.larksuite.com
SMTP Port (SSL): 465
SMTP Port (STARTTLS): 587
IMAP Address: imap.larksuite.com
IMAP Port (SSL): 993
IMAP/SMTP Password: 2ld1pkSCpIWAVwj5
```

### 🔧 **Konfigurasi .env.local**
```env
# LarkSuite SMTP Configuration
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=web.marketing@vortiqx.com
SMTP_PASS=2ld1pkSCpIWAVwj5
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=web.marketing@vortiqx.com

# Alternative port (STARTTLS)
# SMTP_PORT=587
```

### 📨 **Alur Email**
- **Sender**: `web.marketing@vortiqx.com` (mengirim email)
- **Recipient**: `contact@vortiqx.com` (menerima email)
- **SMTP Auth**: `web.marketing@vortiqx.com` (untuk autentikasi)

### ✅ **Status Konfigurasi**
- ✅ **SMTP Host**: smtp.larksuite.com
- ✅ **SMTP Port**: 465 (SSL)
- ✅ **SMTP User**: web.marketing@vortiqx.com
- ✅ **SMTP Pass**: 2ld1pkSCpIWAVwj5
- ✅ **Contact To**: contact@vortiqx.com
- ✅ **Contact From**: web.marketing@vortiqx.com

### 🚀 **Testing**
1. Buka http://localhost:3000
2. Scroll ke bagian Contact
3. Isi form dengan data valid
4. Klik "Send Message"
5. Cek email di `contact@vortiqx.com`

### 🔄 **Alternative Port (jika diperlukan)**
Jika port 465 tidak bekerja, gunakan port 587 dengan STARTTLS:
```env
SMTP_PORT=587
```

### 📋 **Troubleshooting**
- Pastikan email `web.marketing@vortiqx.com` aktif di LarkSuite
- Pastikan password SMTP benar: `2ld1pkSCpIWAVwj5`
- Cek log server untuk debug informasi
- Pastikan file `.env.local` ada di root project
