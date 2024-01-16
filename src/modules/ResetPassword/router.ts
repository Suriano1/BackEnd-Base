import { Router } from 'express';
import { resetPasswordController } from './Controller/reset-password-controller';
// Router
const router: Router = Router();
const baseUrl = '/reset-password';
router.post(`${baseUrl}`, resetPasswordController.validateUser);
router.patch(`${baseUrl}`, resetPasswordController.resetPassword);
router.post(
  `${baseUrl}/validate`,
  resetPasswordController.validateSecurityCode,
);

export const resetPasswordRouter = router;
