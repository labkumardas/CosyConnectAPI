"use strict";

// import userModel from '../../model/userModel.js';
// import mongoose from "mongoose";
import faqModel from "../../model/faqModel.js";
import dotenv from 'dotenv';
dotenv.config();

class faqRepository {
  constructor() {
    // 
  }

  async faqData(data) {
    try {
      const get = await faqModel.find({ role: data });
      return get
    } catch (error) {
      throw new Error(error)
    }
  }

}

export default new faqRepository();