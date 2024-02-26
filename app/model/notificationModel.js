"use strict";
import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true, },
  isRead: { type: Boolean, required: true, trim: true },
  sendBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  receiveBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  status: { type: Boolean, trim: true, default: true, },
  createdAt: { type: Date, default: Date.now },
});
notificationSchema.index({ title: 1, isRead: 1, receiveBy: 1 });
const notificationModel = mongoose.model('notifications', notificationSchema);
export default notificationModel;
