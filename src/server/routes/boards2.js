const express = require('express');
const router = express.Router();
const Boards = require('../models/board2');


const {
  boardCreate,
} = require("./constboards");

router.get('/', async (req, res) => {
  try {
    const boards = await Boards.find();
    res.json(boards);
  } catch {
    res.json({ message: err });
  }
})

router.get('/:boardId', async (req, res, next) => {
  try {
    const id = req.params.boardId;
    const board = await Boards.findById(id);
    res.send(board);
  } catch {
    res.json({ message: err });
  }

});


router.post('/', (req, res) => {
  boardCreate(req.body, "user", res);
})

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