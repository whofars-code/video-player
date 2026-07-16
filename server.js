require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Ambil dari environment variable, TIDAK pernah dikirim ke browser
const FONNTE_TOKEN = process.env.FONNTE_TOKEN;
const TARGET_NUMBER = process.env.TARGET_WA_NUMBER;

if (!FONNTE_TOKEN || !TARGET_NUMBER) {
  console.warn('⚠️  FONNTE_TOKEN atau TARGET_WA_NUMBER belum diset di file .env');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint yang dipanggil frontend setelah user mengizinkan lokasi
app.post('/api/kirim-lokasi', async (req, res) => {
  try {
    const { lat, lon, accuracy } = req.body;

    if (typeof lat !== 'number' || typeof lon !== 'number') {
      return res.status(400).json({ ok: false, error: 'lat/lon tidak valid' });
    }

    const mapsLink = `https://maps.google.com/?q=${lat},${lon}`;
    const message =
      `📍 Lokasi baru diterima\n` +
      `Latitude: ${lat}\n` +
      `Longitude: ${lon}\n` +
      `Akurasi: ±${Math.round(accuracy || 0)} meter\n` +
      `Peta: ${mapsLink}\n` +
      `Waktu: ${new Date().toLocaleString('id-ID')}`;

    const fonnteRes = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': FONNTE_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        target: TARGET_NUMBER,
        message: message
      })
    });

    const data = await fonnteRes.json();

    if (fonnteRes.ok && data.status !== false) {
      return res.json({ ok: true });
    } else {
      console.error('Fonnte error:', data);
      return res.status(502).json({ ok: false, error: data.reason || 'Gagal mengirim ke Fonnte' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
