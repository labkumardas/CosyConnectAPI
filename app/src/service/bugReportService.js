// service/global/globalService.js
"use strict";
import globalHelper from '../../helper/globalHelper.js';
import userRepository from '../repository/userRepository.js';
import bugReportRepository from '../repository/bugReportRepository.js';

class bugReportService {
  constructor() {
    this.helper = new globalHelper();
  }

  // async isPhoneExists(phone, userId) {
  //   const existingUser = await userRepository.findPhone(phone, userId);
  //   return !!existingUser;
  // }



  async createBugReport(description, user_id) {

    const userData = {
      description: description,
      user_id: user_id,
    }
    try {
      return await bugReportRepository.insertBug(userData);
    }
    catch (error) {
      throw new Error(error)
    }
  }


  async SentMail(description, user_id) {
    try {
      const sent = await bugReportRepository.mailSent(description, user_id);
      return sent;
    }
    catch (error) {
      throw new Error(error)
    }
  }


}

export default new bugReportService();