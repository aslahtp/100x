const a=require('axios')


function axiosGetCallback(url,callback){
    
    a.get(url).then(
        function(res) {
        callback(null,res.data)
    }).catch(function(err){
        callback(err,null)
    })
}


axiosGetCallback('https://raw.githubusercontent.com/dominictarr/random-name/refs/heads/master/first-names.json',function(err,data){
    if(err){
        console.log(err)
    }
    else{
        console.log(data)
    }
})