const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/trello', 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('CONNECTED TO DB')
)

const api = require('./routes/api');
const boards2 = require('./routes/boards2');
const columns2 = require('./routes/columns2');
const tasks2 = require('./routes/tasks2');
const replaceTask = require('./routes/replaceCard');
const forCard = require('./routes/forCard');
// const PORT = 4000;
const app = express();

var corsOptions={
    origin: "http://localhost:7071"
};

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(corsOptions)); 

app.use('/api', api);
app.use('/boards2', boards2);
app.use('/columns2', columns2);
app.use('/tasks2', tasks2);
app.use('/replaceTask', replaceTask);
app.use('/forCard', forCard);

const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})