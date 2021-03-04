const express = require('express');
const router = express.Router();
const Boards = require('../models/board2');

router.post('/:boardId/:columnId', async (req, res) => {
    try {
        const task = await Boards.findOneAndUpdate(
            {
                '_id': req.params.boardId,
                'columns._id': req.params.columnId
            },
            { $addToSet: { 'columns.$.tasks': req.body } },
            { new: true },
            function (err, doc) {
                console.log(doc);
                if (doc == null) {
                    return res.status(401).send('Name is already taken.')
                }
                else {
                    console.log('dskjtanherk');
                }
            })
        res.send(task);
    } catch {
        res.json({ message: err });
    }
})


module.exports = router;