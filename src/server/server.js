const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7070;

const routes = require('../routes/api');
var cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

var mongoDB = 'mongodb://127.0.0.1/my_database_example';
mongoose.connect( process.env.mongodb_URI || mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is now connected!');
});



if (process.env.NODE_ENV === 'production') {
   app.use(express.static('/build'));
}

app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));