"use strict";
import globalHelper from '../../helper/globalHelper.js';
import authRepository from '../repository/authRepository.js';
import twilioService from '../../helper/twilioService.js';
import twilioConfig from '../../../config/twilioConfig.js'
import moment from 'moment';
const { twilioAccountSid, twilioAuthToken, twilioPhoneNumber } = twilioConfig;
class authService {
  constructor() {
    this.helper = new globalHelper();
    this.twilioService = new twilioService(twilioAccountSid, twilioAuthToken, twilioPhoneNumber);

  }

  async UserCheck(user_id) {
    try {
      const getData = await authRepository.userCheck(user_id);
      return getData;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async isCheckAdminBlocked(username) {
    try {
      const userName = username.toLowerCase();
      const getData = await authRepository.checkIsAdminBlocked(userName);
      return getData;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async loginWithUsername(username, password) {
    try {
      const userName = username.toLowerCase();
      const getData = await authRepository.userLogin(userName, password);
      return getData;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async loginWithPhoneNumber(phoneNumber) {
    try {
      const body = "Test otp: ";
      const otp = Math.floor(100000 + Math.random() * 900000);
      const sent = await this.twilioService.sendOtp(phoneNumber, otp, body);
      if (sent) {
        return { message: 'OTP sent successfully', otpSent: otp };
      } else {
        throw new Error('Failed to send OTP');
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async saveLoginHistory(data) {
    try {
      const userData = {
        user_id: data.user.userId,
        userToken: data.accessToken,
        deviceType: null,
        deviceId: null,
        isActive: true,
        isBlacklist: false,
        lastLogin: moment().format('DD-MM-YYYY hh:mm:ss A'),
      }
      const insert = await authRepository.createLoginHistory(userData);
      return insert;

    }
    catch (error) {
      throw new Error(error)
    }
  }

  async logOut(userId, authHeader) {
    const token = authHeader.substring(7);
    const newData = {
      isActive: false,
      isBlacklist: true,
    }
    try {
      const result = await authRepository.updateLoginHistory(userId, token, newData);
      return result;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async checkBlackListToken(authHeader) {
    const token = authHeader.substring(7);
    try {

      return await authRepository.checkToken(token);

    }
    catch (error) {
      throw new Error(error)
    }
  }


}

export default new authService();