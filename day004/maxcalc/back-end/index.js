const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/sum/:a/:b", (req, res) => {
  const a = req.params.a;
  const b = req.params.b;
  res.send(`Sum is ${parseInt(a) + parseInt(b)}`);
});

app.post("/sum_up_to", (req, res) => {
  const n = req.body.n;
  //console.log(n);
  res.send(`Sum is ${(n * (n + 1)) / 2}`);
});

app.put("/max/:c", (req, res) => {
  const a = parseInt(req.query.a);
  const b = req.body.b;
  const c = parseInt(req.params.c);
  const d = req.headers.d;

  console.log(a, b, c, d);
  console.log(typeof a, typeof b, typeof c, typeof d);
  res.send({max: Math.max(a, b, c, d)});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
