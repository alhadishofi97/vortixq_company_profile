# Video Background Optimization Guide

## Optimasi Video Background

### 1. Format Video yang Direkomendasikan:
- **MP4 (H.264)**: Kompatibilitas terbaik, ukuran file optimal
- **WebM (VP9)**: Kompresi lebih baik, ukuran file lebih kecil
- **Resolusi**: 1920x1080 (Full HD) atau 1280x720 (HD)
- **Bitrate**: 2-5 Mbps untuk kualitas optimal
- **Frame Rate**: 30fps (cukup untuk background)

### 2. File yang Diperlukan:
```
public/videos/
├── bg.mp4          # Video utama (MP4 format)
├── bg.webm         # Video alternatif (WebM format) - OPSIONAL
└── bg-poster.jpg   # Poster image (1920x1080) - OPSIONAL
```

### 3. Optimasi Video dengan FFmpeg:

#### Kompresi MP4 (H.264):
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart bg.mp4
```

#### Konversi ke WebM:
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus bg.webm
```

#### Buat Poster Image:
```bash
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 -q:v 2 bg-poster.jpg
```

### 4. Parameter Optimasi:
- **CRF 23**: Kualitas tinggi dengan ukuran file optimal
- **Preset medium**: Balance antara encoding speed dan compression
- **Faststart**: Memungkinkan video mulai diputar sebelum download selesai
- **Audio 128k**: Kualitas audio yang cukup untuk background

### 5. Ukuran File Target:
- **MP4**: 5-15 MB untuk video 10-30 detik
- **WebM**: 3-10 MB untuk video 10-30 detik
- **Poster**: 100-500 KB

### 6. Browser Compatibility:
- **MP4**: Chrome, Firefox, Safari, Edge
- **WebM**: Chrome, Firefox, Edge (tidak didukung Safari lama)
- **Fallback**: Gradient background jika video gagal load
