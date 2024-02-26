"use strict";
import mongoose from 'mongoose';
const daterBugetSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  extra_service: {
    type: String,
    enum: ['holding hands', 'cuddles', 'Hugs', 'kisses'],
    default: 'cuddles',
  },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
}, { timestamps: true, versionKey: false });
daterBugetSchema.index({ extra_service: 1, price: 1, duration: 1 });
const daterBugetModel = mongoose.model('daterbudget', daterBugetSchema);
export default daterBugetModel; 
