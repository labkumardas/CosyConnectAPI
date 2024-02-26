import authRoutes from './auth-route.js';
import daterExtraRoutes from './dater-extra-route.js'
import registrationRoutes from './registration-route.js';
import globalRoutes from './global-route.js';
import cmsRoutes from './cms-route.js';
import daterRoutes from './dater-route.js';
import bugRoutes from './bug-route.js';
import faqRoutes from './faq-route.js';

const setupRoutes = (app) => {
  // Set up all your routes here
  registrationRoutes(app);
  authRoutes(app);
  globalRoutes(app);
  daterExtraRoutes(app)
  daterRoutes(app);
  cmsRoutes(app)
  bugRoutes(app)
  faqRoutes(app)
};

export default setupRoutes;