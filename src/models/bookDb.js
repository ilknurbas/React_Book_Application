const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookDbSchema = new Schema({
    id: String,
    title: String,
    author: String,
    date:String
});

const BookDb = mongoose.model('BookDb', BookDbSchema);
module.exports =  BookDb;