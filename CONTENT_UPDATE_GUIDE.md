# Panduan Singkat Update Konten

## Struktur Halaman
- Home: `src/app/page.tsx`
- Services: `src/app/services/page.tsx`
- Komponen Services: `src/app/modules/services/views/ServiceCards.tsx`
- About: `src/app/modules/about/views/AboutView.tsx`
- Contact: `src/app/modules/contact/views/ContactView.tsx`

## Mengubah Teks
Cari teks pada komponen terkait dan ubah langsung. Semua font sudah responsif.

## Mengubah Hero Title
- Home: data judul diambil dari `HomeController.tsx`. Ubah sumber data atau ganti static di `HomeView.tsx`.

## Menambah/Mengubah Service
- Edit daftar kartu di `ServiceCards.tsx`.

## Kontak (SMTP)
Buat file `.env` di root dengan variabel berikut:
```
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
CONTACT_TO=...
CONTACT_FROM=...
```
Lihat contoh di `CONTACT_ENV_EXAMPLE.txt`.

## Deploy
- Jalankan `npm run build` lalu deploy ke hosting/Node. Pastikan `.env` terpasang di server.
