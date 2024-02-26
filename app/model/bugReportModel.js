"use strict";
import mongoose from 'mongoose';

let bugReportSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  description: { type: String, trim: true, required: true, },
});
bugReportSchema.index({ description: 1, user_id: 1, });
const bugReportModel = mongoose.model('bugreport', bugReportSchema);
export default bugReportModel; 