import { Router } from 'express';
import healthRoutes from '../components/health/v1/health.routes';
import usersRoutes from '../components/users/web/users.routes';
import educationExperienceRoutes from '../components/education_experience/web/education_experience.routes';
import authRoutes from '../components/auth/web/auth.routes';

interface Route {
  path: string;
  handler: Router;
}

const routes: Route[] = [
  { path: '/v1/health', handler: healthRoutes },
  { path: '/v1/users', handler: usersRoutes },
  { path: '/v1/education-experiences', handler: educationExperienceRoutes },
  { path: '/v1/auth', handler: authRoutes }
];

const createRouter = (routes: Route[]): Router => {
  const router = Router();
  routes.forEach(({ path, handler }) => router.use(path, handler));
  return router;
}

export default createRouter(routes);
