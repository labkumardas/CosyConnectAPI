// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';

class BugReportController {
  constructor() {
    this.userService = container.resolve('userService');
    this.bugReportService = container.resolve('bugReportService');

  }

  BugReport = async (req, res) => {
    try {
      let user_id = req.user.userId

      const result = await this.bugReportService.createBugReport(req.body.description, user_id);
      // if (result) {
      //   await this.bugReportService.SentMail(req.body.description, user_id);
      // }
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: { result } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

}
export default new BugReportController(); 
