"use strict";
import userModel from '../../model/userModel.js';
import roleModel from '../../model/roleModel.js';
import daterBudgetModel from "../../model/daterBudgetModel.js"
import clientBillModel from "../../model/clientBillModel.js"

class extraRepository {
  constructor() {
    //
  }

  async createExtraData(data) {
    try {
      return await daterBudgetModel.create(data);
    }
    catch (error) {
      throw new Error(error)
    }
  }
  async findDaterViewlist(daterId) {
    try {
      let arrData = await daterBudgetModel.find({ user_id: daterId });
      return arrData
    }
    catch (error) {
      throw new Error(error)
    }
  }
  async generatebill(dater) {
    try {
      let arrData = await clientBillModel.create(dater);
      return arrData
    }
    catch (error) {
      throw new Error(error)
    }
  }

}

export default new extraRepository();