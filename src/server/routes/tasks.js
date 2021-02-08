const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Boards = require('../models/board');
const Columns = require('../models/column');
const Tasks = require('../models/task');

////////////////--------------TASKS--------------////////////////

router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.json(tasks);
    } catch {
        res.json({ message: err });
    }
  })
  
  router.get('/:id', async (req, res) => {
    try{
        const tasks = await Tasks.findById(req.params.id);
        res.send(tasks);
    }catch{
        res.json({ message: err });
    }
    
  });
  
  router.post('/', (req, res) => {
    const task = new Tasks({
      id: req.body.id,
      name: req.body.name,
    });
  
    task.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({message: err})
    })
  })
  
  router.put('/:id', async (req,res) => {
    try{
        const updatedTask = await Tasks.updateOne(
            {_id: req.params.id}, 
            {$set:{
              name: req.body.name
            }}
        );
        res.send(updatedTask);
    }catch{
        res.json({ message: err });
    }
  
  });
  
  router.delete('/:id', async (req,res) =>{
  try{
      const removedTask = await Tasks.remove({_id: req.params.id});
      res.send(removedTask);
  }catch{
      res.json({ message: err });
  }
  });

  module.exports = router;