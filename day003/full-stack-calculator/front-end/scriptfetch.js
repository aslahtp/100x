function cal(exp) {
  var input1 = document.getElementById("input1").value;
  var input2 = document.getElementById("input2").value;
  fetch("http://localhost:3001/eval", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      a: input1,
      b: input2,
      exp: exp,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("lab1").innerHTML = data;
    });
}
