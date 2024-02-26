// service/global/globalService.js
"use strict";
import userModel from '../../model/userModel.js';
import profileImageModel from '../../model/profileImageModel.js';
import userSettingModel from '../../model/userSettingModel.js';
import roleModel from '../../model/roleModel.js';
import userReportModel from '../../model/userReportModel.js';
import visitDaterModel from '../../model/visitDaterModel.js';


class daterRepository {
  constructor() {
    // 
  }

  async userVisit(client_id) {
    let existingUser = await visitDaterModel.findOne({ $and: [{ client_id: client_id, }] })
    return !!existingUser;
  }

  async findDaterProfile(profileId) {
    let existingUser = await userModel.findOne({ _id: profileId }).select('-password');
    return existingUser;
  }

  async createUserVisit(type, client_id, profile_id) {
    let existingUser = await visitDaterModel.create({ type: type, client_id: client_id, dater_id: profile_id })
    return existingUser;
  }

  async updateDaterVisit(profileId) {
    let existingUser = await userModel.findOneAndUpdate({ _id: profileId },
      { $inc: { no_of_visit: 1 } }, // Use $inc to increment the field by 1
      { new: true, select: '-password' }).select('-password');
    return existingUser;
  }


}

export default new daterRepository();