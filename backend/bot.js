// import express from "express";
// import bodyParser from "body-parser";
// import axios from "axios";

// const app = express();
// app.use(bodyParser.json());

// const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// // Webhook endpoint for Telegram updates
// app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {

//   const message = req.body.message;
//   if (!message || !message.chat) return res.sendStatus(200);

//   const chatId = message.chat.id;

//   if (message.text === "/start") {
//     const reply = `👋 Hi ${message.chat.first_name || "there"}!
// Your Telegram ID is: \`${chatId}\`
// Copy this ID and add it to your profile in the FinTrackr app.`;

//     await axios.post(`${API_URL}/sendMessage`, {
//       chat_id: chatId,
//       text: reply,
//       parse_mode: "Markdown"
//     });
//   }

//   res.sendStatus(200);
// });

// app.listen(5000, () => console.log("🤖 Telegram bot server running on port 5000"));


import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`👋 Hi ${ctx.from.first_name || "there"}!\nYour Telegram ID is: \`${ctx.chat.id}\``, {
    parse_mode: "Markdown",
  });
});

bot.on("text", (ctx) => {
  ctx.reply("💡 Please type /start to get your Telegram ID.");
});

bot.launch();
console.log("🚀 Telegraf bot running locally...");