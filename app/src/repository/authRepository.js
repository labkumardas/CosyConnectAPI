"use strict";
import userModel from '../../model/userModel.js';
import roleModel from '../../model/roleModel.js';
import loginHistory from '../../model/loginHistory.js';
import bcrypt from 'bcryptjs';

class authRepository {
  constructor() {
    //
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


  async checkIsAdminBlocked(username,) {

    try {
      let data = await userModel.findOne({ username: username, isAdminBlocked: true });
      return data
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async userLogin(username, password) {
    try {
      const user = await userModel.findOne({ username: username, });
      if (!user) {
        return !!user;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return !!passwordMatch;
      }
      const roleId = user.role_id;
      const roleData = await roleModel.findById({ _id: roleId });
      const data = {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: roleData.role_slug,
      }
      return data;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async createLoginHistory(data) {
    try {
      return loginHistory.create(data);
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async updateLoginHistory(userId, token, newData) {
    try {
      return await loginHistory.findOneAndUpdate({ user_id: userId, userToken: token }, { $set: newData }, { new: true });
    }
    catch (error) {
      throw new Error(error)
    }
  }
  async checkToken(token) {
    try {
      const result = await loginHistory.findOne({ userToken: token, isBlacklist: true });
      return !!result;
    }
    catch (error) {
      throw new Error(error)
    }
  }

}

export default new authRepository();