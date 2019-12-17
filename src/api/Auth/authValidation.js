import Joi from 'joi';

export const LoginValidationSchema = Joi.object().keys({
  matricNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const SignUpValidationSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  matricNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const RefreshTokensValidationSchema = Joi.object().keys({
  refreshToken: Joi.string().uuid().required(),
});