// controller/global/globalController.js
"use strict";
import container from '../../container/container.js';
import responseStatus from '../../../util/responseStatus.js';

class GlobalController {
  constructor() {
    this.userService = container.resolve('userService');
    this.roleService = container.resolve('roleService');
    this.notificationService = container.resolve('notificationService');
  }

  viewRole = async (req, res) => {
    try {
      const result = await this.roleService.viewRoleList(req.body);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: { result } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }



  ActivityList = async (req, res) => {
    try {
      const result = await this.notificationService.GetActivityList(req.user.userId);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: { result } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }


  ApproveRequest = async (req, res) => {
    let request_id = req.body.requestId
    let receiver_id = req.user.userId

    try {
      const result = await this.notificationService.updateFriendStatus(request_id, receiver_id, 'accepted');
      const { code, message } = responseStatus.getStatus('OK', 'Connection Approved succesful');
      return res.status(code).send({ status: code, message, data: { result } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  DeleteRequest = async (req, res) => {
    let request_id = req.body.requestId
    let receiver_id = req.user.userId
    try {
      const result = await this.notificationService.updateFriendStatus(request_id, receiver_id, 'rejected');
      const { code, message } = responseStatus.getStatus('OK', 'Connection Rejected succesful');
      return res.status(code).send({ status: code, message, data: { result } });

    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }


  friendList = async (req, res) => {
    try {
      let user_id = req.user.userId
      const data = await this.userService.getAllFriend(user_id);
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: data });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }

  peopleAroundUs = async (req, res) => {
    try {
      let user_id = req.user.userId
      let userRole = req.user.role
      let data

      if (userRole == "user") {
        let user_role = "Dater"
        data = await this.userService.getPeopleAround(user_id, user_role);
      }
      if (userRole == "dater") {
        let user_role = "User"
        data = await this.userService.getPeopleAround(user_id, user_role);
      }
      const { code, message } = responseStatus.getStatus('OK');
      return res.status(code).send({ status: code, message, data: data });
    } catch (error) {
      const { code, message } = responseStatus.getStatus('INTERNAL_SERVER_ERROR');
      return res.status(code).send({ status: code, message, error: error.message });
    }
  }
}

export default new GlobalController();
