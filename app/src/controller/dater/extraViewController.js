// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';


class ExtraViewController {
  constructor() {
    this.extraService = container.resolve('extraService');
    this.notificationService = container.resolve('notificationService');
  }

  viewExtra = async (req, res) => {
    try {
      let user_id = req.user.userId
      const result = await this.extraService.createExtraView(req.body, user_id);
      const { code, message } = responseStatus.getStatus('CREATED', 'Extra views added successful');
      return res.status(code).send({ status: code, message, data: { result } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }


  getExtraViewListByUser = async (req, res) => {

    try {
      const viewReview = await this.extraService.getExtraMetaData(req.body.daterId);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: viewReview });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  CreateBillBydater = async (req, res) => {
    try {
      let user_id = req.user.userId
      const isCheckFriendStatus = await this.extraService.checkfriendStatus(req.body.client_id, user_id);
      if (!isCheckFriendStatus) {
        const { code, message } = responseStatus.getStatus('OK', 'pending your request');
        return res.status(code).send({ status: code, message, data: { isCheckFriendStatus } });
      }
      const bill = await this.extraService.generateBill(req.body, user_id);
      if (bill) {
        const data = await this.notificationService.sendbillNotifi(req.body.client_id, user_id, 'Bill_Request');
      }
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: bill });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

}
export default new ExtraViewController();
