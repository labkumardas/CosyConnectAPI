"use strict";
import mongoose from 'mongoose';
const visitDaterSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  dater_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  type: { type: String, trim: true },

  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });
visitDaterSchema.index({ client_id: 1, dater_id: 1 });
const visitDaterModel = mongoose.model('visitdater', visitDaterSchema);
export default visitDaterModel; 
