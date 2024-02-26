"use strict";
import mongoose from 'mongoose';
const profileImageSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  image: { type: String, trim: true },
  name: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});
profileImageSchema.index({ user_id: 1, image: 1 });
const profileImageModel = mongoose.model('profileimages', profileImageSchema);
export default profileImageModel;
