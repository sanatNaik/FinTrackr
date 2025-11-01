import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String,required:true,unique:true},
    password: {type: String, required:true},

    googleId: { type: String, default:null},
    telegramId: {type: String,default:null}
},{timestamp:true});

export default mongoose.model("User",userSchema);