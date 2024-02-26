"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';

class registrationController {
  constructor() {
    this.userService = container.resolve('userService');
  }

  checkUserPhone = async (req, res) => {
    try {

      const result = await this.userService.isPhoneExists(req.body.phone);
      if (result) {
        const { code, message } = responseStatus.getStatus('EXISTING_PHONE_NUMBER');
        return res.status(code).send({ status: code, message, data: { isPhoneExists: result } });
      }
      else {
        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: { isPhoneExists: result } });
      }

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      console.log(error);
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  checkUserEmail = async (req, res) => {
    try {

      const result = await this.userService.isEmailExists(req.body.email);
      if (result) {
        const { code, message } = responseStatus.getStatus('EXISTING_EMAIL');
        return res.status(code).send({ status: code, message, data: { isEmailExists: result } });
      }
      else {
        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: { isEmailExists: result } });
      }

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      console.log(error);
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  checkUserName = async (req, res) => {
    try {
      const userName = req.body.username.toLowerCase();
      const result = await this.userService.isUsernameExists(userName);
      if (result) {
        const { code, message } = responseStatus.getStatus('EXISTING_USERNAME');
        return res.status(code).send({ status: code, message, data: { isUsernameExists: result } });
      }
      else {
        const { code, message } = responseStatus.getStatus('OK');
        return res.status(code).send({ status: code, message, data: { isUsernameExists: result } });
      }

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      console.log(error);
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }
  userDataCreate = async (req, res) => {
    try {
      // console.log('object', req.files)
      const isEmailExists = await this.userService.isEmailExists(req.body.email);
      if (isEmailExists) {
        const { code, message } = responseStatus.getStatus('EXISTING_EMAIL');
        return res.status(code).send({ status: code, message, data: { isEmailExists } });
      }

      // Check if phone exists
      const isPhoneExists = await this.userService.isPhoneExists(req.body.phone);
      if (isPhoneExists) {
        const { code, message } = responseStatus.getStatus('EXISTING_PHONE_NUMBER');
        return res.status(code).send({ status: code, message, data: { isPhoneExists } });
      }

      // Check if username exists
      const userName = req.body.username.toLowerCase();

      const isUsernameExists = await this.userService.isUsernameExists(userName);
      if (isUsernameExists) {
        const { code, message } = responseStatus.getStatus('EXISTING_USERNAME');
        return res.status(code).send({ status: code, message, data: { isUsernameExists } });
      }
      let updateImage;
      const createUserRequiredFild = await this.userService.createUser(req.body);
      const lastId = createUserRequiredFild._id;
      await this.userService.updateUserSetting(req.body, lastId);
      console.log('uploadedFiles', req.uploadedFiles);
      if (req.uploadedFiles) {
        updateImage = await this.userService.updateProfileImage(req.uploadedFiles.url, lastId);
      }
      const { code, message } = responseStatus.getStatus('CREATED', 'User registration successful.');
      return res.status(code).send({ status: code, message, data: { user_id: lastId, image: updateImage } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }


  userUpdate = async (req, res) => {

    try {
      const user_id = req.user.userId
      const isEmailExists = await this.userService.isEmailExists(req.body.email, user_id);
      if (isEmailExists) {
        const { code, message } = responseStatus.getStatus('SAME_EMAIL');
        return res.status(code).send({ status: code, message, data: { isEmailExists } });
      }

      // Check if phone exists
      const isPhoneExists = await this.userService.isPhoneExists(req.body.phone, user_id);

      if (isPhoneExists) {
        const { code, message } = responseStatus.getStatus('SAME_PHONE_NUMBER');
        return res.status(code).send({ status: code, message, data: { isPhoneExists } });
      }

      // Check if username exists
      let userName = req.body.username
      if (userName != null) userName.toLowerCase();
      const isUsernameExists = await this.userService.isUsernameExists(userName, user_id);
      if (isUsernameExists) {
        const { code, message } = responseStatus.getStatus('SAME_USERNAME');
        return res.status(code).send({ status: code, message, data: { isUsernameExists } });
      }
      let updateImage;
      await this.userService.updateUser(req.body, user_id);
      await this.userService.updateUserSetting(req.body, user_id);

      if (req.uploadedFiles) {
        updateImage = await this.userService.updateProfileImage(req.uploadedFiles.url, user_id);
      }
      const { code, message } = responseStatus.getStatus('UPDATED', 'Profile Updated successful.');

      return res.status(code).send({ status: code, message, data: { user_id: user_id, } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  deleteUser = async (req, res) => {

    try {
      const user_id = req.user.userId
      const del = await this.userService.deleteProfile(user_id);
      // if (del) {
      const { code, message } = responseStatus.getStatus('OK', "Your Account has been Deleted");
      return res.status(code).send({ status: code, message, });
      // } else {
      //   const { code, message } = responseStatus.getStatus('OK', "Your Account has already deleted");
      //   return res.status(code).send({ status: code, message, });
      // }
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }


  addedPhoto = async (req, res) => {
    try {

      const user_id = req.user.userId
      let updateImage;
      console.log('uploadedFiles', req.uploadedFiles);
      // if (req.uploadedFiles) {
      updateImage = await this.userService.updateUserImage(req.uploadedFiles, user_id);
      // }
      const { code, message } = responseStatus.getStatus('OK', 'Image Added successful.');
      return res.status(code).send({ status: code, message, data: { user_id: user_id, } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }


  deletePhoto = async (req, res) => {
    try {

      const user_id = req.user.userId
      let photo = req.body.photos

      await this.userService.deleteUserImage(photo, user_id);

      const { code, message } = responseStatus.getStatus('OK', 'Delete Photo successful.');
      return res.status(code).send({ status: code, message, data: { user_id: user_id, } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }























}

export default new registrationController();
