"use strict";
import configApi from '../../config/configApi.js';
import authController from '../src/controller/auth/authController.js';
import verifyTokenMiddleware from '../middleware/auth/verifyTokenMiddleware.js';
import RegistrationValidation from '../middleware/validation/registrationValidation.js';
//
const { apiPrefix } = configApi;
export default function setupAuthRoutes(app) {
    app.post(`${apiPrefix}/loginWith/username`,RegistrationValidation.userLoginValidation,authController.userAuth);
    app.post(`${apiPrefix}/loginWith/otp`, authController.loginWithOtp);
    app.post(`${apiPrefix}/user/logout`,verifyTokenMiddleware, authController.userLogOut);
}
 