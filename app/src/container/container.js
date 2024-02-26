// container.js
"use strict";
import serviceLocator from './serviceLocator.js';
import globalHelper from './../../helper/globalHelper.js';
import userService from '../service/userService.js';
import authService from '../service/authService.js';
import reviewService from '../service/reviewService.js';
import notificationService from '../service/notificationService.js';
import roleService from '../service/roleService.js';
import extraService from '../service/extraService.js';
import cmsService from '../service/cmsService.js';
//
import redisServerHelper from '../redis/redisServerHelper.js';
import twilioService from '../../helper/twilioService.js';
import generateToken from '../../helper/generateToken.js';
import daterService from '../service/daterService.js';
import faqService from '../service/faqService.js';
import bugReportService from '../service/bugReportService.js';
import mailSender from '../../helper/mailSender.js';

//register service
serviceLocator.register('authService', authService);
serviceLocator.register('userService', userService);
serviceLocator.register('reviewService', reviewService);
serviceLocator.register('notificationService', notificationService);
serviceLocator.register('roleService', roleService);
serviceLocator.register('extraService', extraService);
serviceLocator.register('cmsService', cmsService);
serviceLocator.register('daterService', daterService);
serviceLocator.register('bugReportService', bugReportService);
serviceLocator.register('faqService', faqService);

//register helper
serviceLocator.register('redisServerHelper', redisServerHelper);
serviceLocator.register('globalHelper', globalHelper);
serviceLocator.register('generateToken', generateToken);
serviceLocator.register('mailSender', mailSender);
export default serviceLocator;