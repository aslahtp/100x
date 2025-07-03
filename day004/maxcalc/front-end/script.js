function cal() {
    //alert("Button clicked");
    const a = document.getElementById("input1").value;
    const b = document.getElementById("input2").value;
    const c = document.getElementById("input3").value;
    const d = document.getElementById("input4").value;
    let url = `http://localhost:3000/max/${c}?a=${a}`;
    axios.put(url, 
        { b: b },
        { headers: { d: d } }
    ).then(res => {
        let final_result = JSON.stringify(res.data.max);
        console.log(res.data);
        document.getElementById("result").innerHTML = final_result;
    });
}