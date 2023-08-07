import { Schema } from "mongoose";

export const blacklistedTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});
