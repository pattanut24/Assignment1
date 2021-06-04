const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Todo = new Schema({
    order : {type: Number, required:true} , 
    createdAt : { type: String , default: Date.now},   
    title : { type: String, required: true} , 
}, {
    collection: "Assignment1"
})

module.exports = mongoose.model('Assignment1', Todo)


