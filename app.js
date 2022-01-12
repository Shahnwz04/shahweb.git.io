//IMPORT 
const express = require('express');
const path = require("path"); 
const bodyparser = require("body-parser")
const fs = require("fs"); 
const app = express();
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost/contactDance");
}

const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    Email: String,
    Phone: String,
    address: String,
});
const contact = mongoose.model("contact", contactSchema);

//schema to model


//for stroring data in static folder 
app.use('/static', express.static('static'));
// app.use(express.urlencoded())   
  
//for storing data in views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

//EndPoint
app.get("/", (req, res)=>{
    const para = {'title': ' '}
    res.status(200).render('home.pug'); 
})

app.get("/contact", (req, res)=>{
    res.status(200).render('contact.pug'); 
})

app.post("/contact", (req, res)=>{
    const myData = new contact(req.body);
    myData.save().then(()=>{
        res.send('this item is saved')
    }).catch(()=>{
        res.status(400).send('Item is not saved')
    })
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`the application started succesfully on port ${port}`);
});







