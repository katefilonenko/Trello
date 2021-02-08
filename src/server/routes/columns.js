const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Boards = require('../models/board');
const Columns = require('../models/column');
const Tasks = require('../models/task');

////////////////--------------COLUMNS--------------////////////////

router.get('/', async (req, res) => {
    try {
        const column = await Columns.find()
        .populate('boards');
        res.json(column);
    } catch {
        res.json({ message: err });
    }
  })
  
  router.get('/:columnId', async (req, res) => {
    try{
        const id = req.params.columnId;
        const column = await Columns.findById(id)
        .populate('boards');
        res.send(column);
    }catch{
        res.json({ message: err });
    }
    
  });
  
  router.post('/', (req, res) => {
    Boards.findById(req.body.boardsId)
    .then(boards => {
      if(!boards) {
        return res.status(404).json({
          message:'Board not found'
        })
      }
      const column = new Columns({
        _id: mongoose.Types.ObjectId(),
        id: req.body.id,
        boards: req.body.boardsId,
        name: req.body.name
      })
      return column
      .save()
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({message: err})
    })
    
  })
  
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