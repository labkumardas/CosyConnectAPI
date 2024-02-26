// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';
 class reviewController {
  constructor() {
    this.reviewService = container.resolve('reviewService');
   }

  createReview = async (req, res) => {
    try {
      const insertReview = await this.reviewService.insertReview(req);
      const { code, message } = responseStatus.getStatus('CREATED');
      return res.status(code).send({ status: code, message, data: { id: insertReview._id } });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }
  reviewListByUser = async (req, res) => {
    try {
      const viewReview = await this.reviewService.viewReviewById(req);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: viewReview });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }
 

}
export default new reviewController();
