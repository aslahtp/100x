const z = require('zod');


const signupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});
const signinSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});

module.exports = {
    signupSchema,
    signinSchema,
};