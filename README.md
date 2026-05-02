# DeepInDiary — Client + Server Setup

## 📁 Folder Structure
```
deepindiary/
├── client/    ← React Frontend (Vite + Tailwind)
└── server/    ← Express Backend (Node.js + MongoDB)
```

---

## ⚙️ Step 1 — Server Setup

```bash
cd server
npm install
```

`.env` file mein apna MongoDB URI aur Admin Password daalo:
```
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=deepindiary
ADMIN_PASSWORD=apna_password_yahan
PORT=5000
```

Server chalaao:
```bash
npm run dev
```
✅ Server `http://localhost:5000` pe chalega

---

## 🌐 Step 2 — Client Setup

Naya terminal kholo:
```bash
cd client
npm install
npm run dev
```
✅ Website `http://localhost:3000` pe open hogi

---

## 🔑 Admin Panel Use Karna

1. Website kholo → Header mein **"🔑 Admin"** button dabaao
2. Post add karne ke liye `.env` wala `ADMIN_PASSWORD` daalo
3. Delete bhi usi password se hoga

---

## 📡 API Routes (Server)

| Method | Route | Kaam |
|--------|-------|------|
| GET | /api/posts | Saare posts laao |
| POST | /api/posts | Naya post add karo |
| DELETE | /api/posts | Post delete karo |
| POST | /api/submissions | User story submit |
| POST | /api/feedback | Feedback save |
| POST | /api/subscribe | Email subscribe |
