

function cal(exp) {
  var input1 = document.getElementById("input1").value;
  var input2 = document.getElementById("input2").value;
  //var result = eval(input1 + exp + input2);
  axios.get("http://localhost:3001/eval", {
    params: {
      num1: input1,
      exp: exp,
      num2: input2,
    },
  }).then((res) => {
    document.getElementById("lab1").innerHTML = res.data;
  });
}
