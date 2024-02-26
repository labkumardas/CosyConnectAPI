"use strict";
import globalHelper from '../../helper/globalHelper.js';
import cmsRepository from '../repository/cmsRepository.js';
// import authRepository from '../repository/authRepository.js';
// import twilioService from '../../helper/twilioService.js';
// import twilioConfig from '../../../config/twilioConfig.js'
// import moment from 'moment';

class cmsService {
  constructor() {
    // this.helper = new globalHelper();
  }

  async cmsGet() {
    try {
      const getData = await cmsRepository.cmsData();
      return getData;
    }
    catch (error) {
      throw new Error(error)
    }
  }
}

export default new cmsService();