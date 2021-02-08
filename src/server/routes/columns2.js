const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

const Boards = require('../models/board2');
const Columns = require('../models/column');
// const Tasks = require('../models/task');

////////////////--------------COLUMNS--------------////////////////

router.get('/', async (req, res) => {
    try {
        const column = await Boards.find();
        res.json(column);
    } catch {
        res.json({ message: err });
    }
  })
  
  router.get('/:columnId', async (req, res) => {
    try{
        const id = req.params.columnId;
        const column = await Columns.findById(id);
        res.send(column);
    }catch{
        res.json({ message: err });
    }
    
  });


router.post('/:id', (req, res) => {
    const boardDetails = {};
    if (req.body.name) boardDetails.name = req.body.name;
    Boards.findByIdAndUpdate(
        { _id: req.params.id },
        boardDetails,
        { new: true }
        // { $set: boardDetails },
        // function (err, doc) {
        //     console.log(doc);
        // }
    )
        .then(board => {
            res.json(board)
        })
        .catch(err => console.log(err));

    //     Boards.findById
    // const column = new Columns({
    //     id: req.body.id,
    //     name: req.body.name,
    //     tasks: req.body.tasks
    // })
    // column
    //     .save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({ message: err })
    //     })
})

// router.post('/', (req, res) => {
//     const column = new Columns({
//         id: req.body.id,
//         name: req.body.name,
//         tasks: req.body.tasks
//     })
//     column
//         .save()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: err })
//         })
// })
  
  router.put('/:id', async (req,res) => {
    try{
        const updatedColumn = await Columns.updateOne(
            {_id: req.params.id}, 
            {$set:{
              name: req.body.name
            }}
        );
        res.send(updatedColumn);
    }catch{
        res.json({ message: err });
    }
  
  });
  
  router.delete('/:columnId', async (req,res) =>{
  try{
      // const id = req.params.columnId;
      const removedColumn = await Columns.remove({_id: req.params.columnId});
      res.send(removedColumn);
  }catch{
      res.json({ message: err });
  }
  });

  module.exports = router;