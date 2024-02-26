"use strict";
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  phone: { type: Number, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  dob: { type: String, required: true, trim: true },
  city: { type: String, trim: true },
  role: { type: String, required: true, trim: true },
  pin: { type: String, trim: true },
  profile_image: { type: String, default: null, trim: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true, unique: false, },
  isActive: { type: Boolean, default: true, },
  isBlocked: { type: Boolean, default: false, },
  createdAt: { type: Date, default: Date.now },
  isProfile: {
    type: String,
    enum: ['private', 'public',], default: 'public',
  },
  isAdminBlocked: { type: Boolean, default: false, },
  isNotification: { type: Boolean, default: true, },
  isDeleted: { type: Boolean, default: false, },
  no_of_visit: { type: Number, default: 0 },
  gender: {
    type: String,
    enum: ['male', 'female', 'other',], default: 'other',
    required: true,
  },
});
userSchema.index({ phone: 1, email: 1, username: 1, password: 1 });
const userModel = mongoose.model('users', userSchema);
export default userModel;
