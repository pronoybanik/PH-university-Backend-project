import express from 'express';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateZodRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

export const AuthRoutes = router;
