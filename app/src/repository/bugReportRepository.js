"use strict";
import userModel from '../../model/userModel.js';
import bugReportModel from '../../model/bugReportModel.js';
import loginHistory from '../../model/loginHistory.js';
import bcrypt from 'bcryptjs';
import mailSender from "../../helper/mailSender.js";

class bugReportRepository {
  constructor() {
    this.mailHelper = new mailSender();
  }


  async userCheck(user_id,) {

    try {
      let data = await userModel.findOne({ _id: user_id, isDeleted: true });
      return data
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async insertBug(data) {

    try {
      let createData = await bugReportModel.create(data);
      return createData
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async mailSent(description, user_id) {
    try {

      let url = process.env.APP_URL + "/privacypolicy/"
      let findUser = await userModel.findOne({ _id: user_id, isDeleted: false });
      // const movePromises = findUser.map(async (value) => {
      await this.mailHelper.sendBugMail(findUser.email, description, '');
      // });
      // await Promise.all(movePromises);

      return findUser
    } catch (error) {
      throw new Error(error)
    }
  }



}

export default new bugReportRepository();