const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const twitterRoutes = require('./routes/twitterRoutes');
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use((err, req, res, next) => {
    res.status(500).send({
        status: 500,
        name: 'Internal error',
        message: err.message
    })
})
app.use(express.static(path.join(__dirname, "public")))

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME
});
var db = mongoose.connection;
if(!db){
    console.log("Error connecting db");
}

app.get("/", (req, res, next) => {
    // res.send('Welcome');
});

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/twitter', twitterRoutes);

app.use(function(req, res, next){
    res.status(404).send({ 
        status: 404,
        message: 'Not found'
     });
});

app.listen(PORT, () => { 
    console.log(`Server started at port ${PORT}`);
});