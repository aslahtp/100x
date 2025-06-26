
            function cal(exp) {
                var input1 = document.getElementById("input1").value;
                var input2 = document.getElementById("input2").value;
                var result = eval(input1 +exp+input2);

                //alert("The result is " + result);
                document.getElementById("lab1").innerHTML = result;
            }
            var num=5;


            function addPost(){
                num++;
                //document.getElementById("post").innerHTML += "<div style='background: red; height: 100px'>";
                document.getElementById("post").innerHTML += "<h1 style='background: red; height: 100px'>Post "+num+"</h1>";
                //document.getElementById("post").innerHTML += "</div>";
            }


window.onscroll = function(ev) {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        // you're at the bottom of the page
        addPost();
    }
};
            
            
