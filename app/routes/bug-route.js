"use strict";
import configApi from '../../config/configApi.js';
// import reviewController from '../src/controller/user/reviewController.js';
// import userController from '../src/controller/user/userController.js';
import verifyTokenMiddleware from '../middleware/auth/verifyTokenMiddleware.js';
import bugReportController from '../src/controller/global/bugReportController.js'
//all routes
const { apiPrefix } = configApi;
export default function setupBugRoutes(app) {
    app.post(`${apiPrefix}/bug/report`, verifyTokenMiddleware, bugReportController.BugReport);
    // app.post(`${apiPrefix}/create/user/review`, verifyTokenMiddleware, reviewController.createReview);
    // app.post(`${apiPrefix}/reviews/byProfile`, verifyTokenMiddleware, reviewController.reviewListByUser);


}
