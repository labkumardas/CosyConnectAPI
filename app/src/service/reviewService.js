// service/global/globalService.js
"use strict";
import globalHelper from '../../helper/globalHelper.js';
import reviewRepository from '../repository/reviewRepository.js';

class reviewService {
  constructor() {
    this.helper = new globalHelper();
  }

  async insertReview(req) {

    const insertData = {
      reviewedBy: req.user.userId,
      reviewedTo: req.body.reviewedTo,
      description: req.body.description,
      rating: req.body.rating
    }
    try {
      return await reviewRepository.createReview(insertData)
    } catch (error) {
      throw new Error(error)
    }
  }

  async viewReviewById(req) {
    const userIds = req.body.reviewedTo;
    try {
      return await reviewRepository.getReview(userIds)
    } catch (error) {
      throw new Error(error)
    }
  }


}

export default new reviewService();