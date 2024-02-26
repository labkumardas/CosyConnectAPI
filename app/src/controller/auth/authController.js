"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';
class authController {
  constructor() {
    this.authService = container.resolve('authService');
    this.generateToken = container.resolve('generateToken');
  }

  //login with username and password
  userAuth = async (req, res) => {
    const { username, password } = req.body;
    try {

      const userCheck = await this.authService.isCheckAdminBlocked(username);
      if (userCheck) {
        const { code, message } = responseStatus.getStatus('OK', "Your Account has been Blocked, Please Contact with Admin.");
        return res.status(code).send({ status: code, message, });
      }
      const user = await this.authService.loginWithUsername(username, password);
      if (user) {
        const userToken = await this.generateToken.createToken(user);
        await this.authService.saveLoginHistory(userToken);
        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: userToken });
      }
      else {
        const { code, message } = responseStatus.getStatus('UNAUTHORIZED');
        return res.status(code).send({ status: code, message, error: "USERNAME OR PASSWORD IS INVALID!" });
      }

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  // getRefreshToken = async (req, res) => {
  //   const userId = req.body.user_id;
  //   const authHeader = req.headers.authorization;
  //   try {
  //   const userToken = await this.generateToken.createToken(user);

  //   } catch (error) {
  //     const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
  //     return res.status(code).send({ status: code, message, error: error.message });
  //   }
  // }

  //login with otp
  loginWithOtp = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      const user = await this.authService.loginWithPhoneNumber(phoneNumber);
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  //for logout 
  userLogOut = async (req, res) => {
    const userId = req.body.user_id;
    const authHeader = req.headers.authorization;
    try {
      await this.authService.logOut(userId, authHeader);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: "Log out success!" });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

}
export default new authController();
