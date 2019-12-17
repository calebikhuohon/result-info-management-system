import Joi from 'joi';

export const studentValidationSchema = Joi.object().keys({
  student:Joi.string(),
  matricNumber: Joi.string(),
  results: Joi.array(),
});