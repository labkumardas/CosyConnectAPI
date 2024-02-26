// service/global/globalService.js
"use strict";
import notificationModel from '../../model/notificationModel.js';
import friendRequestModel from '../../model/friendRequestModel.js';

class notificationRepository {
  constructor() {
  }

  async storeFriendRequst(friendRequestData, notificationData) {
    try {
      const [insertReq, insertNoti] = await Promise.all([
        friendRequestModel.create(friendRequestData),
        notificationModel.create(notificationData),
      ]);
      return insertNoti;
    } catch (error) {
      throw new Error(error);
    }
  }

  async storeBillRequst(notificationData) {
    try {
      const insertNoti = await notificationModel.create(notificationData)

      return insertNoti;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getActivity(id) {
    try {
      const list = await notificationModel.find({ receiveBy: id })
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async friendStatus(id, receiver_id, statusKey) {
    console.log('>>>>>>', id, receiver_id, statusKey)
    try {
      let up = await friendRequestModel.findOneAndUpdate({ _id: id, receiverId: receiver_id }, { status: statusKey }, { new: true })
      return up
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new notificationRepository();