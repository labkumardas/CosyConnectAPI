"use strict";
import globalHelper from '../../helper/globalHelper.js';
import notificationRepository from '../repository/notificationRepository.js';
import userRepository from '../repository/userRepository.js';
import notificationText from '../../util/notificationText.js';

class notificationService {
    constructor() {
        this.helper = new globalHelper();
    }

    async sendRequestToUser(data, sender_id, type) {

        const senderIdName = await userRepository.getUserIdByUsername(sender_id);

        const notificationTextInstance = new notificationText();
        const friendRequestData = {
            senderId: sender_id,
            receiverId: data.receiverId,
            status: 'pending',
        };

        const notificationData = {
            title: notificationTextInstance.requestSendTitle(senderIdName),
            content: notificationTextInstance.requestSendBody(senderIdName),
            type: notificationTextInstance.getType(type).message,
            sendBy: sender_id,
            receiveBy: data.receiverId,
            isRead: false,
        }

        try {
            return await notificationRepository.storeFriendRequst(friendRequestData, notificationData);
        } catch (error) {
            throw new Error(error);
        }
    }


    async sendbillNotifi(receive_id, sender_id, type) {

        const senderIdName = await userRepository.getUserIdByUsername(sender_id);

        const notificationTextInstance = new notificationText();

        const notificationData = {
            title: notificationTextInstance.billRequestBody(senderIdName),
            content: notificationTextInstance.billRequestBody(senderIdName),
            type: notificationTextInstance.getType(type).message,
            sendBy: sender_id,
            receiveBy: receive_id,
            isRead: false,
        }
        try {
            return await notificationRepository.storeBillRequst(notificationData);
        } catch (error) {
            throw new Error(error);
        }
    }


    async GetActivityList(id) {
        try {
            return await notificationRepository.getActivity(id)
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateFriendStatus(request_id, receiver_id, statusKey) {
        try {
            return await notificationRepository.friendStatus(request_id, receiver_id, statusKey)
        } catch (error) {
            throw new Error(error);
        }

    }
}

export default new notificationService();