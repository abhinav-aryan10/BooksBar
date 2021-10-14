// creating  DB connection 


const express =require('express'),
path = require('path'),
mongoose = require ('mongoose');
cors = require('cors');
const bodyParser = require('body-parser');  
const createError = require('http-errors');

mongoDb = require('./database/db');

mongoose.Promise = global.Promise;

mongoose.connect(mongoDb.db,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database Connected Successfully")
},
error => {
    console.log("DB Error!: " + error)
})

// create server and port
const bookRoute= require('./node-backend/routes/book.routes');
const app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

// Create Static path

app.use(express.static(path.join(__dirname,'dist/Bookstore')));

//API Root
app.use('/api',bookRoute);

//port creation
const port = process.env.port || 8000;
app.listen(port,()=>{
    console.log('Port is listening on: '+port);
})

// Handling Error 404
app.use((req, res,next)=>{
    next(createError(404));
});
//base route
app.get('/',(req,res)=>{
    res.send('indvalid endpoint');
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});

app.use(function(err, req,res, next){
    console.log(err.message);
    if(!err.statusCode)err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
