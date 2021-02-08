const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

const Boards = require('../models/board2');

////////////////--------------BOARDS--------------////////////////

router.get('/', async (req, res) => {
    try {
        const boards = await Boards.find();
        res.json(boards);
    } catch {
        res.json({ message: err });
    }
})


router.get('/:boardId', async (req, res, next) => {
  try{
    const id = req.params.boardId;
    const board = await Boards.findById(id);
    res.send(board);
  }catch{
    res.json({ message: err });
  }

});


router.post('/', (req, res) => {
  const board = new Boards({
    // _id: new mongoose.Types.ObjectId(),
    id: req.body.id,
    name: req.body.name,
    columns: req.body.columns
  });

  board.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err })
    })
})

// router.post('/', (req, res) => {
//   Columns.findById(req.body.columnId)
//   .then(columns => {
//     if(!columns){
//       return res.status(404).json({
//         message:'Column not found'
//       })
//     }
//     const board = new Boards({
//       _id: new mongoose.Types.ObjectId(),
//       id: req.body.id,
//       name: req.body.name,
//       columns: req.body.columnId
//     })
//     return board
//     .save()
//   })
//   .then(data => {
//     res.json(data);
//   })
//   .catch(err => {
//     res.json({ message: err })
//   })
// })

router.put('/:id', (req, res) => {
  const boardDetails = {};
  if (req.body.name) boardDetails.name = req.body.name;
  Boards.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: boardDetails },
    function (err, doc) {
      console.log(doc);
    }
  )
    .then(board => {
      res.json(board)
    })
    .catch(err => console.log(err));
})

// router.put('/:boardId', async (req, res) => {
//   try {
//     console.log(req.body)
//     const id = req.params.boardId;
//     const updatedBoard = await Boards.updateOne(
//       { _id: id },
//       {$set: {name: req.body.name}}
//     );
//     res.send(updatedBoard);
//   } catch {
//     res.json({ message: err });
//   }
// });


router.delete('/:boardId', async (req, res) => {
  try {
    const id = req.params.boardId;
    const removedBoard = await Boards.remove({ _id: id });
    res.send(removedBoard);
  } catch {
    res.json({ message: err });
  }
});


module.exports = router;