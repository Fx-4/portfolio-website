# 📧 Setup Contact Form dengan Vercel Serverless

## ✅ Yang Sudah Saya Lakukan:

1. ✅ Buat folder `/api` dan file `contact.js` (serverless function)
2. ✅ Update `ContactSection.jsx` untuk kirim data ke `/api/contact`
3. ✅ Tambah status message (success/error) dan loading state

---

## 🚀 LANGKAH-LANGKAH SETUP:

### **STEP 1: Install Nodemailer**

Buka terminal di root project, jalankan:

```bash
npm install nodemailer
```

---

### **STEP 2: Setup Gmail App Password**

1. **Buka Google Account Settings**  
   Kunjungi: https://myaccount.google.com/apppasswords

2. **Login dengan akun Gmail kamu**

3. **Buat App Password baru:**
   - App name: "Portfolio Contact Form"
   - Klik "Generate"
   - Copy password 16 digit yang muncul (contoh: `abcd efgh ijkl mnop`)
   - **JANGAN TUTUP** halaman ini dulu, kita butuh password ini nanti

---

### **STEP 3: Test di Local (Opsional)**

Sebelum deploy ke Vercel, test dulu di local:

1. **Buat file `.env.local`** di root project:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

2. **Jalankan dev server:**

```bash
npm run dev
```

3. **Buka browser:** http://localhost:5173/contact
4. **Test form** — coba isi dan submit

**CATATAN:** Vercel serverless functions tidak jalan di local dev (hanya di production), jadi kalau error 404 di local, itu normal. Langsung skip ke STEP 4.

---

### **STEP 4: Push ke GitHub**

```bash
git add .
git commit -m "Add contact form with Vercel serverless"
git push origin main
```

---

### **STEP 5: Deploy ke Vercel**

#### **A. Jika Belum Punya Akun Vercel:**

1. Buka https://vercel.com/signup
2. Sign up dengan GitHub
3. Authorize Vercel untuk akses repo kamu

#### **B. Deploy Project:**

1. **Klik "Add New Project"**
2. **Import Git Repository** → Pilih repo portfolio kamu
3. **Klik "Deploy"** (langsung deploy dulu, nanti kita set env variables)
4. **Tunggu 1-2 menit** sampai deploy selesai
5. **Akan dapat URL:** `https://your-portfolio.vercel.app`

---

### **STEP 6: Set Environment Variables di Vercel**

1. **Buka Project di Vercel Dashboard**
2. **Klik tab "Settings"**
3. **Klik "Environment Variables"** di sidebar kiri
4. **Tambahkan 2 variables:**

   **Variable 1:**
   - Name: `EMAIL_USER`
   - Value: `your-email@gmail.com` (email kamu yang tadi bikin App Password)
   - Environment: **Production** (centang)
   - Klik "Save"

   **Variable 2:**
   - Name: `EMAIL_PASS`
   - Value: `abcd efgh ijkl mnop` (App Password 16 digit tadi)
   - Environment: **Production** (centang)
   - Klik "Save"

5. **Redeploy Project:**
   - Klik tab "Deployments"
   - Klik titik 3 di deployment terakhir
   - Klik "Redeploy"
   - Tunggu sampai selesai

---

### **STEP 7: Test Contact Form di Production**

1. **Buka website kamu:** `https://your-portfolio.vercel.app/contact`
2. **Isi form** dengan data test:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Message: "This is a test message"
3. **Klik Submit**
4. **Cek email kamu** — harusnya dapat email dari "test@example.com" dengan subject "Portfolio Contact: Test User"

---

## 🔧 TROUBLESHOOTING:

### **Problem 1: Form submit tapi tidak ada email masuk**

**Solusi:**
- Cek Gmail Spam folder
- Pastikan `EMAIL_USER` dan `EMAIL_PASS` sudah benar di Vercel
- Redeploy setelah set env variables
- Cek Vercel Function Logs: Dashboard → Functions → Klik function → Lihat logs

---

### **Problem 2: Error "Invalid login"**

**Solusi:**
- Pastikan App Password 16 digit benar (tidak ada spasi)
- Pastikan "2-Step Verification" aktif di Google Account
- Buat App Password baru jika lupa

---

### **Problem 3: Error 404 saat submit form**

**Solusi:**
- Pastikan folder `api` ada di root project (sejajar dengan `src`)
- Pastikan file `api/contact.js` ada
- Redeploy ke Vercel

---

### **Problem 4: Form tidak muncul pesan sukses/error**

**Solusi:**
- Buka DevTools Console (F12) → lihat error
- Pastikan semua field form punya atribut `name` yang benar:
  - `name="fullName"`
  - `name="email"`
  - `name="message"`

---

## 📝 FILE STRUCTURE FINAL:

```
website-portofolio/
├── api/
│   └── contact.js           ✅ Serverless function
├── src/
│   ├── components/
│   │   └── ContactSection.jsx  ✅ Updated dengan fetch API
│   └── ...
├── .env.local               (untuk test local, jangan commit!)
├── package.json
└── README.md
```

---

## 🎉 SELESAI!

Contact form kamu sekarang:
- ✅ Kirim email sungguhan via Gmail
- ✅ Gratis unlimited (pakai Gmail free tier 500 email/hari)
- ✅ Frontend + Backend jadi satu di Vercel
- ✅ Tidak perlu backend server terpisah

---

## 📌 NEXT STEPS (Opsional):

1. **Tambah Email Template lebih bagus** (HTML dengan CSS inline)
2. **Auto-reply ke pengirim** (kirim "Thank you for contacting me")
3. **Rate limiting** (batasi submit per IP, cegah spam)
4. **Simpan data ke Database** (Supabase/MongoDB) untuk backup
5. **Analytics** (track berapa orang submit form)

---

**Butuh bantuan?** Tanya saja! 🚀
