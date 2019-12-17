import express from 'express';
import { validation } from '../../middleware';
import { controllerHandler } from '../../helpers/controllerHandler';
import { authorize } from '../../middleware/authorization';
import { UserController } from './userController';
import { UserValidationSchema } from './userValidation';

const router = express.Router();
const call = controllerHandler;
const User = new UserController();

router.use(validation(UserValidationSchema));

router.put('/:id', authorize, call(User.editProfile, (req, _res, _next) => [
  req.params.id,
  req.body,
]));

router.get(
  '/:id',
  call(User.getUser, (req, _res, _next) => [{ _id: req.params.id }])
);

export const userRouter = router;