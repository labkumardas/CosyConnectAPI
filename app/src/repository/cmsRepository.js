"use strict";

import cmsModel from "../../model/cmsModel.js";

class cmsRepository {
  constructor() {
    // 
  }

  async cmsData() {
    try {
      const get = await cmsModel.findOne();
      return get
    } catch (error) {
      throw new Error(error)
    }
  }

}

export default new cmsRepository();