const mongoose = require('mongoose');

const columnsSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    boards: {type: mongoose.Schema.Types.ObjectId, ref:'MyBoards', required: true},
    name: String,
    // tasks: Array
})

module.exports = mongoose.model('MyColumns', columnsSchema);

// const Schema = mongoose.Schema;

// const columnsSchema =  new Schema({
//     id: Number,
//     name: String,
//     tasks: Array
// })

// const boardSchema = new Schema({
//     id: Number,
//     name: String,
//     columns: [columnsSchema.schema]
// })

// module.exports = mongoose.model('boards', boardSchema);