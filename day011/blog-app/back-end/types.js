const z = require("zod");

const userSchemazod = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});

const blogSchemazod = z.object({
    title: z.string().min(3),
    content: z.string().min(3),
});

module.exports = { userSchemazod, blogSchemazod };