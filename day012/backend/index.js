const express = require("express");
const { PrismaClient } = require("./generated/prisma");

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: { username, password },
  });
  res.json(user);
});

app.post("/signin", async (req, res) => {

  const { username, password } = req.body;
  const user = await prisma.user
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});