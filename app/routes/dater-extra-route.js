"use strict";
import configApi from '../../config/configApi.js';
import extraController from '../src/controller/dater/extraViewController.js';
import verifyTokenMiddleware from '../middleware/auth/verifyTokenMiddleware.js';
// import daterController from '../src/controller/dater/daterController.js';
// import RegistrationValidation from '../middleware/validation/registrationValidation.js';
//
const { apiPrefix } = configApi;
export default function setupDaterExtraRoutes(app) {

  app.post(`${apiPrefix}/dater/create/extra/view`, verifyTokenMiddleware, extraController.viewExtra);
  // app.post(`${apiPrefix}/dater/profile`, verifyTokenMiddleware, extraController.getDaterProfile);
  app.post(`${apiPrefix}/dater/list/by/user`, verifyTokenMiddleware, extraController.getExtraViewListByUser);
  app.post(`${apiPrefix}/generate/bill/dater`, verifyTokenMiddleware, extraController.CreateBillBydater);
}
