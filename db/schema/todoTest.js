const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Todo = new Schema({
    order : {type: Number, required: true } , 
    createdAt : { type: Date , default: Date.now},   
    title : { type: String, required: true} , 
}, {
    collection: "test"
})

module.exports = mongoose.model('test', Todo)
