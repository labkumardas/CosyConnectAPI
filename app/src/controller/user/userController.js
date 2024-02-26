// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';
//
class userController {
  constructor() {
    this.userService = container.resolve('userService');
    this.notificationService = container.resolve('notificationService');
    this.extraService = container.resolve('extraService')
  }

  profileList = async (req, res) => {
    try {
      let user_id = req.user.userId
      const data = await this.userService.getAllProfile(user_id,);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: data });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  // normal user
  getProfileMeta = async (req, res) => {
    try {
      const data = await this.userService.getProfileMetaData(req.body.profileId);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: data });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  blockProfile = async (req, res) => {
    try {
      let user_id = req.user.userId
      const data = await this.userService.createBlockProfile(req.body, user_id);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: data });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  sendRequest = async (req, res) => {
    let senderId = req.user.userId
    // console.log('objectsenderId', senderId)
    try {
      const isCheckFriendStatus = await this.extraService.checkfriendrequest(req.body.receiverId, senderId);
      if (isCheckFriendStatus) {
        const { code, message } = responseStatus.getStatus('OK', 'Already Sent Connection Request');
        return res.status(code).send({ status: code, message, data: { isCheckFriendStatus } });
      }
      const data = await this.notificationService.sendRequestToUser(req.body, senderId, 'Friend_Request');
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: data });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  hideProfile = async (req, res) => {
    try {
      let user_id = req.user.userId
      const isProfileCheck = await this.userService.checkProfile(user_id, req.body);

      if (isProfileCheck) {
        const { code, message } = responseStatus.getStatus('OK', "Your Account has been Already Hide");
        return res.status(code).send({ status: code, message, });
      }
      const data = await this.userService.HideOrUnHideProfile(user_id, req.body);
      const { code, message } = responseStatus.getStatus('OK', "Your Account Hide Successful");
      return res.status(code).send({ status: code, message, });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }
  unHideProfile = async (req, res) => {
    try {
      let user_id = req.user.userId
      const isProfileCheck = await this.userService.checkProfile(user_id, req.body);

      if (isProfileCheck) {
        const { code, message } = responseStatus.getStatus('OK', "Your Account has been Already UnHide");
        return res.status(code).send({ status: code, message, });
      }
      const data = await this.userService.HideOrUnHideProfile(user_id, req.body);
      const { code, message } = responseStatus.getStatus('OK', "Your Account UnHide Successful");
      return res.status(code).send({ status: code, message, });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

}

export default new userController();
