# Quick SMTP Setup Guide

## Langkah-langkah Setup SMTP LarkSuite

### 1. Edit File .env.local

Buka file `.env.local` di root project dan ganti `your_larksuite_email@larksuite.com` dengan email LarkSuite yang sebenarnya:

```env
# LarkSuite SMTP Configuration
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=your_actual_larksuite_email@larksuite.com  # ← GANTI INI
SMTP_PASS=2ld1pkSCpIWAVwj5
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=website@vortiqx.com
```

### 2. Ganti Email yang Benar

**Contoh:**
- Jika email LarkSuite Anda adalah `admin@company.com`
- Maka ganti menjadi: `SMTP_USER=admin@company.com`

### 3. Restart Server

```bash
# Stop server (Ctrl+C)
# Kemudian jalankan lagi:
npm run dev
```

### 4. Test Contact Form

1. Buka http://localhost:3000
2. Scroll ke bagian Contact
3. Isi form dengan data valid
4. Klik "Send Message"
5. Cek apakah ada error atau sukses

### 5. Troubleshooting

**Jika masih error "Konfigurasi SMTP belum lengkap":**
- Pastikan file `.env.local` ada di root project
- Pastikan tidak ada spasi di awal/akhir nilai
- Restart server setelah mengubah file

**Jika error authentication:**
- Pastikan email dan password benar
- Cek apakah email LarkSuite aktif

### 6. Verifikasi Konfigurasi

Cek apakah konfigurasi sudah benar:

```bash
# Cek isi file .env.local
cat .env.local

# Cek apakah server membaca environment
# Lihat di console saat server start, harus ada:
# - Environments: .env.local
```

## Email yang Perlu Diganti

**WAJIB DIGANTI:**
- `SMTP_USER`: Email LarkSuite yang sebenarnya
- `SMTP_PASS`: Password SMTP yang benar (jika berbeda)

**OPSIONAL:**
- `CONTACT_TO`: Email tujuan (default: contact@vortiqx.com)
- `CONTACT_FROM`: Email pengirim (default: website@vortiqx.com)
