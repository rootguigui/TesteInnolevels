import mongoose from "mongoose";

interface IAuthHistory {
  jwe: string;
  email: string;
  createdAt: Date;
}

const authHistorySchema = new mongoose.Schema({
  jwe: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const AuthHistory = mongoose.model<IAuthHistory>("AuthHistory", authHistorySchema);

export default AuthHistory;
