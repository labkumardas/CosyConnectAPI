"use strict";
import extraRepository from '../repository/extraRepository.js';
import friendRepository from '../repository/friendRepository.js';

class extraService {
  constructor() {
  }

  async createExtraView(daterData, user_id) {
    try {

      daterData = {
        ...daterData, user_id: user_id
      }
      const getData = await extraRepository.createExtraData(daterData);
      return getData;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async getExtraMetaData(profileId) {
    let daterId = profileId
    try {
      return await extraRepository.findDaterViewlist(daterId);
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async checkfriendStatus(client_id, dater_id) {
    try {
      let checkFriendConnet = await friendRepository.friendcheck(client_id, dater_id)
      return !!checkFriendConnet
    }
    catch (error) {
      throw new Error(error)
    }
  }


  async checkfriendrequest(client_id, dater_id) {
    try {
      let checkFriendConnet = await friendRepository.alreadyfriendrequest(client_id, dater_id)
      console.log('>>>>', !!checkFriendConnet,)
      return !!checkFriendConnet
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async generateBill(daterData, dater_id) {
    let dater = daterData
    dater = { ...daterData, dater_id }
    try {
      return await extraRepository.generatebill(dater);
    }
    catch (error) {
      throw new Error(error)
    }
  }

}

export default new extraService();