const a = require("axios");
const fs = require("fs");
const path = require("path");

function procdata(data) {
  let arr = [];
  let var2 = "A";
  console.log(data);
  for (let i in data) {
    console.log(data[i]);
    if (data[i].startsWith(var2)) {
      arr.push(data[i]);
    } else {
        singleLine=arr.join(', ')
      fs.writeFile("ans/" + var2 + ".txt", singleLine, function (err) {
        if (err) {
          console.log(err);
        } 
      });

      var2 = data[i].charAt(0);
      arr = [];
      arr.push(data[i]);
    }
  }
}

function getdata() {
  a.get(
    "https://raw.githubusercontent.com/dominictarr/random-name/refs/heads/master/first-names.json"
  )
    .then((res) => {
      procdata(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
getdata();





