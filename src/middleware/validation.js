import Joi from "joi";
import _ from "lodash";
import { Request, Response, NextFunction } from "express";

/**
 *  Validates incoming input in the body of a request.
 *  Runs only on POST or PUT requests
 *
 * @export
 * @param {*} schema validationSchema for this route
 * @returns
 */
export const validation = (schema, options) => {

    // enabled HTTP methods for request data validation
    const _supportedMethods = ["post", "put", "patch"];

    // Joi validation options
    const _validationOptions = {
        abortEarly: true, // abort after the first validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true, // remove unknown keys from the validated data
        ...options,
    };

    // return the validation middleware
    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method) && schema) {

            try {
                /**
                 * Validate req.body using the schema and validation options
                 * Replace req.body with the data after Joi validation
                 */
                req.body = Joi.attempt(req.body, schema, _validationOptions);
                next();

            } catch (error) {
                const message = error.details[0].message.replace(/['"]/g, "");
                /* Format response */
                const JoiError = {
                    status: false,
                    message,
                };

                res.status(400).json(JoiError);
            }

        } else {
            next();
        }
    };
};
