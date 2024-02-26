// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';


class ExtraViewController {
  constructor() {
    this.daterService = container.resolve('daterService');
  }

  // dater user
  getDaterProfile = async (req, res) => {
    try {
      let client_id = req.user.userId
      let dater_id = req.body.daterId

      let checkVisit = await this.daterService.checkUserVisit(client_id, dater_id);
      if (checkVisit) {
        const data = await this.daterService.getDaterProfile(dater_id);
        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: data });
      } else {
        await this.daterService.UserVisitCreate(client_id, dater_id);
        const data = await this.daterService.daterVisitUpdate(dater_id);
        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: data });
      }
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }


  // getExtraViewListByUser = async (req, res) => { 
  //   try {
  //     const viewReview = await this.extraService.getExtraMetaData(req.body.daterId);
  //     const { code, message } = responseStatus.getStatus('OK');
  //     return res.status(code).send({ status: code, message, data: viewReview });
  //   } catch (error) {
  //     const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
  //     return res.status(code).send({ status: code, message, error: error.message });
  //   }
  // }

}
export default new ExtraViewController();
