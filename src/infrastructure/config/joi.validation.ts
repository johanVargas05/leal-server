import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
    MONGODB_DB_URI: joi.required(),
    PORT: joi.number().default(3000)
});