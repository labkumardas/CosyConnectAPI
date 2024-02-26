"use strict";
import mongoose from 'mongoose';
const clientBillSchema = new mongoose.Schema({
  // user_id == dater_id
  dater_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  extra_service: {
    type: String,
    enum: ['holding hands', 'cuddles', 'Hugs', 'kisses'],
    default: 'cuddles',
  },
  price: { type: String, },
  duration: { type: String, },
  status: {
    type: String,
    enum: ['Paid', 'Not Paid'],
    default: 'Not Paid',
  },
  // createdAt: { type: Date, default: Date.now },
}, { timestamps: true, versionKey: false });
clientBillSchema.index({ extra_service: 1, price: 1, duration: 1 });
const clientBillModel = mongoose.model('clientbills', clientBillSchema);
export default clientBillModel; 
