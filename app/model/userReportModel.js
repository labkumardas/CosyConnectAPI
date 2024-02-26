"use strict";
import mongoose from 'mongoose';
const userReportMetaSchema = new mongoose.Schema({
  profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  report_type: {
    type: String,
    enum: ['block', 'inappropriate_behaviour', 'spamming', 'hate_speech', 'nudity', 'identity_theft', 'harassment'],
    default: 'block',
  },
  description: { type: String, trim: true },
  reportBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date, default: Date.now },
});
userReportMetaSchema.index({ user_id: 1 });
const userReportModel = mongoose.model('userreports', userReportMetaSchema);
export default userReportModel;


