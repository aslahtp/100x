const jwt = require("jsonwebtoken");

//jwt.sign({ foo: 'bar' }, 'shhhhh');

var token = jwt.sign(
  {
    data: "foobar",
  },
  "secret",
  { expiresIn: "1h" }
);
console.log(token);

let decoded = jwt.verify(token, "secret", (err, decoded) => {
  if (err) {
    console.log(err);
  } else {
    console.log(decoded);
  }
});

