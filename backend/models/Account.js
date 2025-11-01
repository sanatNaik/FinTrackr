import mongoose, { Schema } from "mongoose";

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    account: { type: String, required: true }, 
    type: { type: String, enum: ["Bank", "Cash", "Other"], default: "Other" },
    balance: { type: Number, default: 0 }
},{timestamp:true});

export default mongoose.model("Account",accountSchema);