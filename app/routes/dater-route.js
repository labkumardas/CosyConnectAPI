"use strict";
import configApi from '../../config/configApi.js';
// import extraController from '../src/controller/dater/extraViewController.js';
import verifyTokenMiddleware from '../middleware/auth/verifyTokenMiddleware.js';
import daterController from '../src/controller/dater/daterController.js';
// import RegistrationValidation from '../middleware/validation/registrationValidation.js';
//
const { apiPrefix } = configApi;
export default function setupDaterRoutes(app) {

  app.post(`${apiPrefix}/dater/profile/view`, verifyTokenMiddleware, daterController.getDaterProfile);

}
