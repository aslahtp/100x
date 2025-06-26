let users=[ "aman","sahil","rohan","rohit","sachin"]
let ans=[]
for (let user in users) {
    if(users[user].startsWith('r')){
        ans.push(users[user])
    }
}
console.log(ans)

