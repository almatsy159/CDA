/*alert("hi")
const url = "http://ip172-18-0-35-d3ihca469qi000ahv8b0-3000.direct.labs.play-with-docker.com:3000/api/"
//http://ip172-18-0-35-d3ihca469qi000ahv8b0-3000.direct.labs.play-with-docker.com:3000/api/register
const form = document.forms.register
console.log(form)
form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target.name.value)
    fetch(`${url}register`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
        })
    }).then(res => {
        console.log("response", res)
        return res.json()
    })
        .then(data => console.log(data))
        .catch(console.error)

})*/
async function toast(opt=0){
    const toast = document.getElementById(`toast${opt}`);
    toast.classList.add("show")
    setTimeout(() => {toast.classList.remove("show");},3000)
}


const url = "http://localhost:3000/api/"
const form = document.forms.register   
const message = document.getElementById("message")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // Recupère la valeur contenu dans les inputs
    console.log(e.target.username.value)
    fetch(`${url}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
        })
    }).then(async res => {
        console.log("response", res)
        //return res.json()
        /*if (res.status == 200){
            message.textContent = "Created successfully"
            message.className = "green"*/
        if (res.status != 200){
            await toast(1)
            message.textContent = "Error didn't created the user"
            message.className = "red"
        } else {
            await toast()
            window.location.href = "login.html"
        }
    })
        .then(data => console.log(data))
        .catch(console.error)
})

const btn = document.querySelector('#login')

btn.addEventListener('click',e =>{ window.location.href = "login.html"})