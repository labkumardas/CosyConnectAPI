"use strict";
import configApi from '../../config/configApi.js';
import faqController from '../src/controller/faq/faqController.js';
import verifyTokenMiddleware from '../middleware/auth/verifyTokenMiddleware.js';

//
const { apiPrefix } = configApi;
export default function setupFaqRoutes(app) {

  app.post(`${apiPrefix}/get/faq/list`, verifyTokenMiddleware, faqController.GetFaq);

}
