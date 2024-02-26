// service/global/globalService.js
"use strict";
import roleModel from '../../model/roleModel.js';

class roleRepository {
  constructor() {
  }

  async getRoleList(data) {
    try {
      return await roleModel.find()
    } catch (error) {
      throw new Error(error)
    }
  }

 

}

export default new roleRepository();