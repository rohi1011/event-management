const express = require('express');
const mongoose  = require('mongoose');
const {signup, login} = require('./src/controllers/authController');
const app = express();
app.use(express.json);
require('dotenv').config();
const verifyToken = require('./src/middleware/authJwt');

const PORT = 3000;

try{
    mongoose.connect('mongodb://localhost:27017/events')
    console.log("Connected to the database");
} catch{
    console.log("Error connecting to the database");
}

app.get('/', (req,res) => {
    return res.status(200).send("Test Request");
});


app.post('/login', login);

app.post('/register', signup);



app.listen(PORT, (err) => {
    if(err) {
        console.log("Error while starting the server");
    } else {
        console.log("Server started at 3000");
    }
});

