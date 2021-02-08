const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String
    // columns: {type: mongoose.Schema.Types.ObjectId, ref: 'MyColumns', required: true}
})

module.exports = mongoose.model('MyBoards', userSchema);