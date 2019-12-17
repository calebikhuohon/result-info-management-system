// import { authorize } from '../../middleware/authorization';
import { controllerHandler } from './../../helpers/controllerHandler';
import express from 'express';
import { validation } from '../../middleware/validation';
import { AuthController } from './authController';
import { LoginValidationSchema, SignupValidationSchema, RefreshTokensValidationSchema } from './authValidation';

const router = express.Router();
const call = controllerHandler;
const Auth = new AuthController();

router.post('/signup', validation(SignupValidationSchema),
  call(Auth.signup, (req, _res, _next) => [req.body]));

router.post('/signin', validation(LoginValidationSchema),
  call(Auth.login, (req, _res, _next) => [req.body]));

router.post('/refresh-token', validation(RefreshTokensValidationSchema),
  call(Auth.refreshTokens, (req, _res, _next) => [req.body.refreshToken]));

export const authRouter = router;
