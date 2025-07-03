const z = require("zod");

const userSchemazod = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
});

const todoSchemazod = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
});

module.exports = { userSchemazod, todoSchemazod };