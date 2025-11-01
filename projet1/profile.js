
/*
const params = new URLSearchParams(window.location.search)

const username  = params.get("user")

*/
const url = "http://localhost:3000/api/"
p_hi = document.getElementById('hi')

const user = fetch(`${url}profile`,{
    method : "GET",
    credentials: 'include'
}).then(res => {console.log("res",res)
    return res.json()
}).then(data=>{console.log("data",data)
    //return data
    p_hi.textContent = `hello ${data.user.username}`
}).catch(err=>console.log(err))

//console.log("user",user)



/*

btn.addEventListener('click',fetch(`${url}logout`, {
    method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials : 'include'
    }).then(res=>res.json()).then(window.location.href="login.html"))
*/

const btn = document.getElementById('logout')
btn.addEventListener('click',e=>{e.preventDefault()
    fetch(`${url}logout`, {
    method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials : 'include'
    }).then(res=>res.json()).then(window.location.href="login.html")

})