"use strict";
import configApi from '../../config/configApi.js';
import fileUploadMiddleware from '../helper/fileUploadMiddleware.js';  // Import handleUploads first
import registrationController from '../src/controller/registration/registrationController.js';
import RegistrationValidation from '../middleware/validation/registrationValidation.js';
import verifyTokenMiddleware from '../middleware/auth/verifyTokenMiddleware.js';
//


const { apiPrefix } = configApi;
export default function setupRegistrationRoutes(app) {
  app.post(`${apiPrefix}/check/user/phone`, registrationController.checkUserPhone);
  app.post(`${apiPrefix}/check/email`, registrationController.checkUserEmail);
  app.post(`${apiPrefix}/check/username`, registrationController.checkUserName);

  app.post(`${apiPrefix}/create/user`, RegistrationValidation.registrationStep1, fileUploadMiddleware.uploadImage, registrationController.userDataCreate);

  app.post(`${apiPrefix}/update/user`, verifyTokenMiddleware, fileUploadMiddleware.uploadImage, registrationController.userUpdate);
  app.post(`${apiPrefix}/delete/user`, verifyTokenMiddleware, fileUploadMiddleware.uploadImage, registrationController.deleteUser);
  app.post(`${apiPrefix}/add/photo`, verifyTokenMiddleware, fileUploadMiddleware.handleUploads, registrationController.addedPhoto);
  app.post(`${apiPrefix}/delete/photo`, verifyTokenMiddleware, fileUploadMiddleware.handleUploads, registrationController.deletePhoto);


}



