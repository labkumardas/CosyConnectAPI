"use strict";
import mongoose from 'mongoose';

let cmsSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
});
cmsSchema.index({ content: 1, type: 1, });
const cmsModel = mongoose.model('cms', cmsSchema);
export default cmsModel; 