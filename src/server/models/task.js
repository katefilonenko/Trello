const mongoose = require('mongoose');

const tasksSchema =  mongoose.Schema({
    id: Number,
    name: String
})

module.exports = mongoose.model('tasks', tasksSchema);