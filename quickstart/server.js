import express from 'express';
import edge from 'edge.js';
import path from 'path';

//Simulate database
const users = [
    {name: "Batman", job: "Rich" },
    {name: "Superman", job: "Alien" },
];

const app = express();
let errorHtml = '';


// Configure edge
edge.mount(path.join(import.meta.dirname, 'views'));

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const html = await edge.render('home', { users });
    res.send(html);
});

app.get('/users', async (req, res) => {
    const html = await edge.render('form', { user: {name:'',job:''},error:errorHtml});
    res.send(html);
    errorHtml = ""
});

app.listen(3000, () => {
    console.log('Server is running on port: 3000')
});

app.post('/users',async (req,res) => {
    //console.log("res",res)
    //console.log('req',req)
    console.log(req.body);
    const new_user = {"name":req.body.username,"job":req.body.job};
    //users.concat(new_user);
    users.push(new_user);
    console.log(users)
    res.redirect("/")
})

app.post("/users/:id",async (req,res)=>{
    const id = req.params.id
    console.log(res.body)
    users[id] = {"name":req.body.username,"job":req.body.job}
    res.redirect('/')
})

app.get("/users/:id",async (req,res)=> {
    console.log(req.params.id)
    const id = req.params.id
    let html = null
    if (id<users.length){
        const user = users[id]
        html = await edge.render('form', { user: user,id:id});
        return res.send(html);
    }
    //else{
        //html = await edge.render('form',{user:{name:'',job:''}})
    errorHtml = `user ${id} n'as pas ete trouvé => redirection`
    res.redirect('/users')   
})

app.get("/users/:id/delete",async (req,res)=>{
    console.log(`should delete user with id : ${req.params.id}`)
    users.splice(req.params.id,1)
    res.json({"message":`user ${req.params.id} a bien été supprimer`})

})

app.get("/users/:id/delete2",async (req,res)=>{
    console.log(`should delete user with id : ${req.params.id}`)
    users.splice(req.params.id,1)
    //res.json({"message":`user ${req.params.id} a bien été supprimer`})
    res.redirect("/")

})