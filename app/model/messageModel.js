"use strict";
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  senderRole: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });
const messageModel = mongoose.model('messages', messageSchema);
export default messageModel;
