import Joi from 'joi';

export const UserValidationSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  matricNumber: Joi.string(),
});