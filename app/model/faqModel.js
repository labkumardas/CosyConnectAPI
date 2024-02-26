"use strict";
import mongoose from 'mongoose';

let faqSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['Dater', 'User',],
    required: true,
  },
  question: { type: String, trim: true, required: true, },
  answer: { type: String, trim: true, required: true, },
});
faqSchema.index({ question: 1, answer: 1, });
const faqModel = mongoose.model('faq', faqSchema);
export default faqModel; 