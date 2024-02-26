// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';


class FaqController {
  constructor() {
    this.faqService = container.resolve('faqService');
  }

  GetFaq = async (req, res) => {
    try {
      let role = req.user.role
      role = (role === "user") ? "User" : (role === "dater") ? "Dater" : role;
      const result = await this.faqService.faqList(role);
      if (result) {
        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: { result } });
      } else {
        const { code, message } = responseStatus.getStatus('NOT_FOUND');
        return res.status(code).send({ status: code, message, });
      }
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

}
export default new FaqController();
