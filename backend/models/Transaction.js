
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  label: { type: String }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
