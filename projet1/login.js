const url = "http://localhost:3000/api/"
const form = document.forms.login


const message = document.getElementById("message")

async function toast(opt=0){
    const toast = document.getElementById(`toast${opt}`);
    toast.classList.add("show")
    setTimeout(() => {toast.classList.remove("show");},3000)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // Recupère la valeur contenu dans les inputs
    console.log(e.target.username.value)
    fetch(`${url}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value
        })
    }).then(async res => {
        console.log("response", res)
        if (res.status === 200) {
            await toast()
            window.location.href = "profile.html"}
        else { 
            await toast(1)
            message.textContent = "invalid id"
            message.className = "red"
        }

    })
        .catch(console.error)
})

btn = document.getElementById('register')

btn.addEventListener("click", e => { window.location.href = "index.html" })
