"use strict";
import mongoose from 'mongoose';
const userRevieSchema = new mongoose.Schema({
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  reviewedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  description: { type: String, trim: true },
  rating: { type: Number, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});
userRevieSchema.index({ reviewBy: 1, reviewFor: 1, rating: 1 });
const userReviewModel = mongoose.model('userreviews', userRevieSchema);
export default userReviewModel;
