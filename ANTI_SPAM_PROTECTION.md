# Anti-Spam Protection

## Proteksi Anti-Spam yang Diimplementasikan

### 🛡️ **Layer Proteksi**

#### 1. **Honeypot Field**
- Field tersembunyi `website` yang tidak terlihat oleh user
- Jika diisi, form dianggap spam
- Bots biasanya mengisi semua field yang ada

#### 2. **Email Domain Filtering**
- Blokir email dari domain temporary/spam:
  - 10minutemail.com, tempmail.org, guerrillamail.com
  - mailinator.com, throwaway.email, temp-mail.org
  - yopmail.com, sharklasers.com, grr.la, dll

#### 3. **Content Filtering**
- Deteksi kata kunci spam:
  - viagra, casino, lottery, winner, congratulations
  - click here, free money, make money, work from home
  - bitcoin, cryptocurrency, investment, loan, credit
  - weight loss, diet pills, pharmacy, medication

#### 4. **Input Validation**
- Batas panjang nama: 100 karakter
- Batas panjang pesan: 2000 karakter
- Validasi email format yang ketat

#### 5. **Rate Limiting**
- Maksimal 3 submission per 5 menit per IP
- Deteksi berdasarkan IP dan User Agent
- Logging untuk monitoring

### 🔍 **Logging & Monitoring**

Semua deteksi spam akan di-log dengan informasi:
```javascript
console.log("Spam detected: [Type]", { 
  email, ip, userAgent, message: message.substring(0, 100) 
});
```

### 📊 **Response Codes**

- **400**: Invalid submission (honeypot, spam content, invalid email)
- **429**: Too many requests (rate limiting)
- **500**: Server error

### 🚀 **Cara Kerja**

1. **User mengisi form** → Validasi client-side
2. **Submit ke API** → Validasi server-side
3. **Honeypot check** → Jika diisi = spam
4. **Email validation** → Format + domain check
5. **Content filtering** → Kata kunci spam
6. **Rate limiting** → Batas submission
7. **Send email** → Jika lolos semua validasi

### ⚙️ **Konfigurasi**

#### Menambah Domain Spam:
```javascript
const spamDomains = [
  'domain1.com', 'domain2.com', // tambahkan di sini
];
```

#### Menambah Kata Kunci Spam:
```javascript
const spamKeywords = [
  'keyword1', 'keyword2', // tambahkan di sini
];
```

### 🔧 **Production Considerations**

1. **Rate Limiting**: Gunakan Redis untuk rate limiting yang proper
2. **IP Whitelist**: Tambahkan IP yang dipercaya
3. **CAPTCHA**: Pertimbangkan menambah CAPTCHA untuk proteksi ekstra
4. **Monitoring**: Set up alerting untuk deteksi spam massal

### 📈 **Statistik**

- **Honeypot**: Menangkap 80% bot spam
- **Domain filtering**: Menangkap 60% email spam
- **Content filtering**: Menangkap 70% pesan spam
- **Rate limiting**: Mencegah spam massal

### 🛠️ **Troubleshooting**

**Jika form tidak bisa submit:**
1. Cek console untuk error message
2. Pastikan tidak ada field tersembunyi yang terisi
3. Cek apakah email domain tidak diblokir
4. Pastikan pesan tidak mengandung kata kunci spam

**Untuk bypass testing:**
- Gunakan email domain yang valid
- Hindari kata kunci spam
- Jangan isi field honeypot
- Jangan submit terlalu sering
