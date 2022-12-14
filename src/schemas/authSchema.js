import joi from 'joi';

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    repeat_password: joi.valid(joi.ref('password')).required()
});

export {
    signUpSchema
};

export const authLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})