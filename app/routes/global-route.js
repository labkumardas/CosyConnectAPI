"use strict";
import configApi from '../../config/configApi.js';
import reviewController from '../src/controller/user/reviewController.js';
import userController from '../src/controller/user/userController.js';
import verifyTokenMiddleware from '../middleware/auth/verifyTokenMiddleware.js';
import globalController from '../src/controller/global/globalController.js'
//all routes
const { apiPrefix } = configApi;
export default function setupGlobalRoutes(app) {
    app.post(`${apiPrefix}/roles`, globalController.viewRole);
    app.post(`${apiPrefix}/create/user/review`, verifyTokenMiddleware, reviewController.createReview);
    app.post(`${apiPrefix}/reviews/byProfile`, verifyTokenMiddleware, reviewController.reviewListByUser);
    app.post(`${apiPrefix}/profile/list`, verifyTokenMiddleware, userController.profileList);
    app.post(`${apiPrefix}/get/profile/metadata`, verifyTokenMiddleware, userController.getProfileMeta);
    app.post(`${apiPrefix}/create/report`, verifyTokenMiddleware, userController.blockProfile);
    app.post(`${apiPrefix}/send/request`, verifyTokenMiddleware, userController.sendRequest);
    app.post(`${apiPrefix}/hide/profile`, verifyTokenMiddleware, userController.hideProfile);
    app.post(`${apiPrefix}/unhide/profile`, verifyTokenMiddleware, userController.unHideProfile);
    app.post(`${apiPrefix}/activity/list`, verifyTokenMiddleware, globalController.ActivityList);
    app.post(`${apiPrefix}/friend/list`, verifyTokenMiddleware, globalController.friendList);
    app.post(`${apiPrefix}/people/around`, verifyTokenMiddleware, globalController.peopleAroundUs);
    app.post(`${apiPrefix}/approve/request`, verifyTokenMiddleware, globalController.ApproveRequest);
    app.post(`${apiPrefix}/reject/request`, verifyTokenMiddleware, globalController.DeleteRequest);
}
