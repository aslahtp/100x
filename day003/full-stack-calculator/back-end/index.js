const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/eval", (req, res) => {
  const { num1, exp, num2 } = req.query;
  res.send(eval(num1 + exp + num2));
});

app.listen(3001);
