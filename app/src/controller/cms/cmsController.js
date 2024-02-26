// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';

class CmsController {
  constructor() {
    this.cmsService = container.resolve('cmsService');
    // this.globalService = container.resolve('globalService');
  }


  getCms = async (req, res) => {
    try {
      const result = await this.cmsService.cmsGet();
      if (result) {

        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: { result } });
      } else {
        const { code, message } = responseStatus.getStatus('NOT_FOUND');
        return res.status(code).send({ status: code, message, data: { result } });
      }
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }
}
export default new CmsController();
