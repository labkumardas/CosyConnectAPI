// service/global/globalService.js
"use strict";
import userReviewModel from '../../model/userReviewModel.js';

class reviewService {
  constructor() {
  }

  async createReview(insertData) {
    try {
      return await userReviewModel.create(insertData)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getReview(userIds) {

    try {
      const reviews = await userReviewModel.find({ reviewedTo: userIds });
      return reviews;
    } catch (error) {
      throw new Error(error)
    }

  }

}

export default new reviewService();