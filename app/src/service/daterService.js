// service/global/globalService.js
"use strict";
import bcrypt from 'bcryptjs';
import globalHelper from '../../helper/globalHelper.js';
import daterRepository from '../repository/daterRepository.js';


class daterService {
  constructor() {
    this.helper = new globalHelper();
  }

  async checkUserVisit(client_id) {
    try {
      return await daterRepository.userVisit(client_id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDaterProfile(profileId) {
    try {
      return await daterRepository.findDaterProfile(profileId);
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async UserVisitCreate(client_id, profile_id) {
    try {
      let type = "profile_seen"
      return await daterRepository.createUserVisit(type, client_id, profile_id);
    }
    catch (error) {
      throw new Error(error)
    }
  }


  async daterVisitUpdate(profileId) {
    try {
      return await daterRepository.updateDaterVisit(profileId);
    }
    catch (error) {
      throw new Error(error)
    }
  }



  // async deleteProfile(user_id) {
  //   try {
  //     return await daterRepository.delProfile(user_id);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

export default new daterService();