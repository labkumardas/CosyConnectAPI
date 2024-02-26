"use strict";
import mongoose from 'mongoose';
const friendrequestSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  status: {
    type: String,
    enum: ['pending','accepted','rejected'],
    default: 'block',
  },
  createdAt: { type: Date, default: Date.now }, 
  });
  friendrequestSchema.index({ senderId: 1, receiverId: 1 , status:1 });
  const friendRequestModel = mongoose.model('friendrequest', friendrequestSchema);
export default friendRequestModel;
 