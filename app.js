//importing modules 
var express = require('express'); 
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser'); 
var cors = require('cors'); 
var path = require('path'); 


var app = express(); 

const route = require('./routes/route'); 

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist'); 

// successful connection
mongoose.connection.on('connected', function(){
    console.log('Connected to mongodb database'); 
}); 

// if connection error
mongoose.connection.on('error', function(err){
    if (err) {
        console.log('Error in Database connection'); 
    }
}); 

// define port number 
const port = 3000; 

// adding middleware - cors 
app.use(cors()); 

//body-parser
app.use(bodyParser.json()); 

// static files 
app.use(express.static(path.join(__dirname, 'public'))); 

// routes 
app.use('/api', route); 

// testing server 
app.get('/', function(req, res){
    res.send('foobar'); 
});

app.listen(port, function() {
    console.log('Server started at port: ' + port); 
}); 