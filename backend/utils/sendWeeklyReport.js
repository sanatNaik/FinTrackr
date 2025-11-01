// utils/sendWeeklyReport.js
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // keep it in .env

export const sendWeeklyReport = async () => {
  try {
    const users = await User.find({ telegramId: { $exists: true, $ne: "" } });
    for (const user of users) {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      const transactions = await Transaction.find({
        userId: user._id,
        date: { $gte: lastWeek }
      });

      let income = 0, expense = 0;
      transactions.forEach(tx => {
        if (tx.type === "income") income += tx.amount;
        else expense += tx.amount;
      });

      const message = `
Hi ${user.name || "User"} 👋
📅 *Weekly Summary*
💰 Income: ₹${income}
💸 Expenses: ₹${expense}
🧾 Net: ₹${income - expense}
`;

      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: user.telegramId,
        text: message,
        parse_mode: "Markdown"
      });
    }

    console.log("✅ Weekly reports sent successfully");
  } catch (err) {
    console.error("❌ Error sending weekly reports:", err.message);
  }
};
