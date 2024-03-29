const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    id: Number,
    name: String,
    columns: [{
        id: Number,
        name: String,
        tasks: [{
            id: Number,
            name: String,
            description: String,
            date: Date,
            comment: String
        }]
    }]
})

module.exports = mongoose.model('boards', boardSchema);