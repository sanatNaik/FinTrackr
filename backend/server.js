import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import cron from "node-cron";

import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { sendWeeklyReport } from "./utils/sendWeeklyReport.js";

import path from "path";
import { fileURLToPath } from "url";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "../frontend/my-react-app/dist");
app.use(express.static(frontendPath));

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;


// 🕘 Run every Monday at 9 AM (IST)
cron.schedule("* * * * *", async () => {
  console.log("📅 Running weekly Telegram report...");
  await sendWeeklyReport();
});

// 🌿 MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connected to MongoDB");
})
.catch(err => console.error("MongoDB connection error:", err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transaction", transactionRoutes);

// 🧩 SINGLE TELEGRAM WEBHOOK HANDLER
app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {
  try {

    const message = req.body.message;
    if (!message || !message.chat) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text?.trim();

    if (text === "/start") {
      const reply = `👋 Hi ${message.chat.first_name || "there"}!
Your Telegram ID is: \`${chatId}\`
Copy this ID and paste it into your FinTrackr profile.`;

      await axios.post(`${API_URL}/sendMessage`, {
        chat_id: chatId,
        text: reply,
        parse_mode: "Markdown"
      });
    } else {
      await axios.post(`${API_URL}/sendMessage`, {
        chat_id: chatId,
        text: "💡 Please type /start to get your Telegram ID.",
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Telegram webhook error:", err.message);
    res.sendStatus(500);
  }
});

// 🧭 Root route


// ✅ 3. Catch-all route — only for client-side routing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
