// Book database schema

const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
let Book = new Schema({
    title : { type: String},
    year : {type : String},
    ISBN : {type: String},
    author: { type : String},
    category : {type: String},
    language : { type: String},
    price : { type: String},
},
{
    collection:'books'
})

//exporting model

module.exports = mongoose.model('Book',Book);