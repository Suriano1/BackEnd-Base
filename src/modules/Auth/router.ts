import { Router } from 'express';
import { authController } from './Controller/auth-controller';

// Router
const router: Router = Router();
const baseUrl = '/auth';
router.post(`${baseUrl}/login`, authController.login);
router.post(`${baseUrl}/token`, authController.token);

export const authRouter = router;
