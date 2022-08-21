import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
    MONGODB_DB_URI: joi.required(),
    PORT: joi.number().default(3000),
    JWT_SECRET_KEY: joi.required(),
    EXPIRES_IN_TOKEN: joi.required(),
});