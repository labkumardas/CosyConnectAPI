"use strict";
import configApi from '../../config/configApi.js';
import cmsController from '../src/controller/cms/cmsController.js';

//
const { apiPrefix } = configApi;
export default function setupCmsRoutes(app) {
  app.post(`${apiPrefix}/getcms`, cmsController.getCms);
}
