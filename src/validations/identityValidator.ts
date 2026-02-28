import Joi from "joi";

export const identifySchema = Joi.object({
    email: Joi.string().email().lowercase().optional(),
    phoneNumber: Joi.alternatives().try(
        Joi.string().pattern(/^[0-9]+$/), // If passed as string
        Joi.number() // If passed as number
    ).optional()
}).or("email", "phoneNumber"); // Requirement: at least one must exist