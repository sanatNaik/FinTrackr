# 📊 FinTrackr

**FinTrackr** is a full-stack personal finance tracking application that helps users manage accounts, track income and expenses, and receive **weekly financial summaries via Telegram**.

Built with **React, Node.js, Express, MongoDB**, and integrated with the **Telegram Bot API**.

---

## ✨ Features

### 🔐 Authentication

* User signup & login using JWT
* Protected routes for authenticated users only

### 💼 Account Management

* Create, edit, and delete accounts (Bank / Cash / Card / Other)
* Maintain real-time account balances

### 💸 Transaction Management

* Add income and expense transactions
* Edit and delete transactions
* Automatic balance updates per transaction
* Validation for insufficient balance on expenses

### 📈 Insights

* Total balance calculation
* Income & expense summaries
* Date-wise transaction history

### 🤖 Telegram Integration

* Telegram bot integration
* Users can link their Telegram ID
* **Automated weekly income & expense report**
* Scheduled using cron jobs (every Monday at 9 AM IST)

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* node-cron
* Telegram Bot API

### Deployment

* Render (backend + frontend)
* MongoDB Atlas

---

## 📂 Project Structure

```
FinTrackr/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── frontend/
│   └── my-react-app/
│       ├── src/
│       ├── dist/        (production build)
│       └── package.json
│
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

⚠️ **Do not commit `.env` to GitHub**

---

## 🚀 Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/FinTrackr.git
cd FinTrackr
```

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install frontend dependencies

```bash
cd ../frontend/my-react-app
npm install
```

### 4️⃣ Build frontend

```bash
npm run build
```

### 5️⃣ Start backend server

```bash
cd ../../backend
node server.js
```

Open 👉 `http://localhost:5000`

---

## 🤖 Telegram Setup

1. Open Telegram and search for your bot
2. Send `/start` to the bot
3. Copy the **Telegram ID** shown by the bot
4. Paste the ID in the **Telegram Setup** section of FinTrackr
5. Save it

📅 You will receive a **weekly summary every Monday at 9 AM IST**

---

## ⏰ Cron Job (Weekly Report)

```js
cron.schedule(
  "0 9 * * 1",
  async () => {
    await sendWeeklyReport();
  },
  {
    timezone: "Asia/Kolkata",
  }
);
```

---

## 🔒 Security Notes

* JWT stored in localStorage
* Protected backend routes using middleware
* MongoDB queries scoped per user
* Telegram ID linked securely to user profile

---

## 🌱 Future Enhancements

* Monthly & yearly reports
* Category-wise analytics
* Email notifications
* Export transactions (CSV / PDF)
* Multi-currency support

---

## 👨‍💻 Author

**Sanat Naik**
B.Tech CSE | Full-Stack & AI Enthusiast
