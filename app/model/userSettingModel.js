"use strict";
import mongoose from 'mongoose';
const userSettingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  user_interest: [{ type: String, trim: true }],
  age_from: { type: String, trim: true },
  age_to: { type: String, trim: true },
  profile_distance: { type: String, trim: true },
  budget: { type: String, trim: true },
  about_user: { type: String, trim: true },
  // cuddle: { type: String, trim: true },
  // kiss: { type: String, trim: true },
  // holding_hand: { type: String, trim: true  },
  address: { type: String, trim: true, required: true },
  user_notification: { type: Boolean, default: true, trim: true },
  user_fingerprint: { type: Boolean, default: false, trim: true },
  createdAt: { type: Date, default: Date.now },
});
userSettingSchema.index({ address: 1, user_id: 1, user_id: 1, age_from: 1, age_to: 1, profile_distance: 1 });
const userSettingModel = mongoose.model('usersettings', userSettingSchema);
export default userSettingModel;
