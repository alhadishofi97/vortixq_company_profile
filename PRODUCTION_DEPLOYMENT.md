# Production Deployment Guide

## Environment Variables untuk Production

Untuk production, Anda perlu mengatur environment variables di hosting platform (Vercel, Netlify, dll):

### 🔧 **Environment Variables yang Diperlukan**

```env
SMTP_HOST=smtp.larksuite.com
SMTP_PORT=465
SMTP_USER=web.marketing@vortiqx.com
SMTP_PASS=2ld1pkSCpIWAVwj5
CONTACT_TO=contact@vortiqx.com
CONTACT_FROM=web.marketing@vortiqx.com
```

### 🚀 **Cara Set Environment Variables**

#### **Vercel:**
1. Buka dashboard Vercel
2. Pilih project Anda
3. Go to Settings > Environment Variables
4. Tambahkan semua variables di atas

#### **Netlify:**
1. Buka dashboard Netlify
2. Pilih site Anda
3. Go to Site settings > Environment variables
4. Tambahkan semua variables di atas

#### **Railway/Render:**
1. Buka dashboard platform
2. Pilih project Anda
3. Go to Environment/Config
4. Tambahkan semua variables di atas

### 🔄 **Fallback Configuration**

API sudah dikonfigurasi dengan fallback values, jadi jika environment variables tidak ter-set, akan menggunakan:
- `SMTP_HOST`: smtp.larksuite.com
- `SMTP_PORT`: 465
- `SMTP_USER`: web.marketing@vortiqx.com
- `SMTP_PASS`: 2ld1pkSCpIWAVwj5
- `CONTACT_TO`: contact@vortiqx.com
- `CONTACT_FROM`: web.marketing@vortiqx.com

### ✅ **Testing Production**

1. Deploy aplikasi ke production
2. Set environment variables
3. Test form contact
4. Cek logs untuk debug info

### 🐛 **Troubleshooting**

**Jika masih error di production:**
1. Cek apakah environment variables sudah ter-set
2. Cek logs production untuk debug info
3. Pastikan SMTP credentials valid
4. Cek apakah hosting platform mendukung SMTP

**Debug Info:**
API akan log konfigurasi SMTP di console production, cek untuk memastikan semua values ter-load dengan benar.
