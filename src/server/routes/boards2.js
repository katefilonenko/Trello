const express = require('express');
const router = express.Router();
const Boards = require('../models/board2');

const {
  boardCreate,
} = require("./constboards");

//получить все доски
router.get('/', async (req, res) => {
  try {
    const boards = await Boards.find();
    res.json(boards);
  } catch {
    res.json({ message: err });
  }
})

//получить доску по id
router.get('/:boardId', async (req, res, next) => {
  try {
    const id = req.params.boardId;
    const board = await Boards.findById(id);
    res.send(board);
  } catch {
    res.json({ message: err });
  }

});

//добавить доску
// router.post('/', (req, res) => {
//   const board = new Boards({
//     id: req.body.id,
//     name: req.body.name,
//     columns: req.body.columns,
//     tasks: req.body.tasks
//   });

//   board.save()
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       res.json({ message: err })
//     })
// })

router.post('/', (req, res) => {
  boardCreate(req.body, "user", res);
})

// изменить доску по id
router.put('/:boardId', async (req, res) => {
  try {
    let nameNotTaken = await validateName(req.body.name);
        if (!nameNotTaken) {
            return res.status(401).send('Name is already taken.')
        }else{
          const board = await Boards.findOneAndUpdate(
            {
              '_id': req.params.boardId,
              // 'name': { $ne: req.body.name }
            },
            { $set: { 'name': req.body.name } },
            function (err, doc) {
              console.log(doc);
              // if (doc == null) {
              //   return res.status(401).send('Name is already taken.')
              // }
              // else {
              //   console.log('dskjtanherk');
              // }
            }
          )
          res.send(board);
        }
  } catch {
    res.json({ message: err });
  }
})

const validateName = async name => {
  let user = await Boards.findOne({ name });
  console.log(user);
  return user ? false : true;
};

//изменить доску по id (исходная)
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

//удалить доску по id
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