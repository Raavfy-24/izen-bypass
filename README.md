# Izen Bypass Website

Website sederhana untuk memproses shortlink melalui API `anabot.my.id`, dibuat agar bisa deploy ke Vercel.

## File
- `index.html` — antarmuka responsif
- `api/bypass.js` — endpoint server-side yang menghubungi API
- `package.json` — metadata project
- `vercel.json` — konfigurasi fungsi Vercel

## Deploy ke Vercel
1. Buat repository GitHub baru dan upload semua file dalam folder ini.
2. Buka https://vercel.com/ lalu import repository tersebut.
3. Deploy dengan pengaturan default. Tidak perlu build command khusus.
4. Opsional: di Project Settings → Environment Variables, tambahkan `IZEN_API_KEY` jika kamu punya API key sendiri. Jika tidak, kode memakai `freeApikey` seperti plugin yang diberikan.
5. Redeploy jika menambahkan atau mengubah environment variable.

## Jalankan lokal
Butuh Node.js dan Vercel CLI:
```bash
npm install
npm install -g vercel
vercel dev
```

## Catatan
- Website ini bergantung pada ketersediaan API pihak ketiga `anabot.my.id` dan API key-nya.
- API key bawaan `freeApikey` bisa dibatasi atau berhenti berfungsi sewaktu-waktu.
- Tambahkan rate limiting / proteksi abuse sebelum website dipublikasikan luas.
- Gunakan hanya untuk tautan yang kamu punya izin untuk akses.
