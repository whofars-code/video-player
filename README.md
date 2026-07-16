# Share Lokasi App

Web sederhana: user klik tombol → browser minta izin lokasi → kalau diizinkan,
koordinat dikirim ke server → server yang meneruskan ke WhatsApp kamu lewat Fonnte.

Token Fonnte dan nomor WA tujuan **disimpan di server (.env)**, tidak pernah
dikirim atau terlihat di browser.

## Cara Jalanin

1. Install dependency:
   ```
   npm install
   ```

2. Copy `.env.example` jadi `.env`, lalu isi:
   ```
   FONNTE_TOKEN=token_asli_dari_fonnte.com
   TARGET_WA_NUMBER=6281234567890
   ```

3. Jalankan server:
   ```
   npm start
   ```

4. Buka `http://localhost:3000` di browser.

## Deploy ke Internet (opsional)

Kalau mau diakses dari HP lain (bukan cuma localhost), deploy ke layanan seperti
Railway, Render, atau Fly.io — cukup upload folder ini dan set environment
variable `FONNTE_TOKEN` & `TARGET_WA_NUMBER` di dashboard mereka (jangan upload
file `.env` ke git/publik).

## Catatan

- Popup izin lokasi dari browser **tidak bisa dilewati** — ini proteksi bawaan
  semua browser modern, bukan sesuatu yang bisa dinonaktifkan lewat kode.
- Jangan commit file `.env` ke repo publik (sudah ada `.gitignore` untuk itu).
