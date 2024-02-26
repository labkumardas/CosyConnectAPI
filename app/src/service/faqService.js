"use strict";
// import globalHelper from '../../helper/globalHelper.js';
import faqRepository from '../repository/faqRepository.js';
// import twilioService from '../../helper/twilioService.js';
// import adminRepository from '../repository/adminRepository.js';
// import twilioConfig from '../../../config/twilioConfig.js'
// import moment from 'moment';
// const { twilioAccountSid, twilioAuthToken, twilioPhoneNumber } = twilioConfig;

class faqService {
  constructor() {
    // this.helper = new globalHelper();
    // this.twilioService = new twilioService(twilioAccountSid, twilioAuthToken, twilioPhoneNumber);

  }


  async faqList(data) {
    try {
      const check = await faqRepository.faqData(data);
      return check;
    }
    catch (error) {
      throw new Error(error)
    }
  }





}

export default new faqService();