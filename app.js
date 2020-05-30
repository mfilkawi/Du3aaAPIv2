const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config()

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

const LoggerMiddleware = (req,res,next) =>{
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next();
}

app.use(bodyParser.json());
app.use(LoggerMiddleware);
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        name: 'Internal error',
        message: err.message
    })
})

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    dbName: process.env.DATABASE_NAME
});
var db = mongoose.connection;
if(!db){
    console.log("Error connecting db");
}

app.get("/", (req, res, next) => {
    res.send('Welcome');
});

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.use(function(req, res, next){
    res.status(404).send({ 
        status: 404,
        message: 'Not found'
     });
});

app.listen(PORT, () => { 
    console.log(`Server started at http://localhost:${PORT}`);
});