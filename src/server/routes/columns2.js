const { NullTemplateVisitor } = require('@angular/compiler');
const express = require('express');
const router = express.Router();
const Boards = require('../models/board2');

router.get('/:boardId/:columnId', (req, res) => {
    Boards.find(
        {
            '_id': req.params.boardId,
            'columns._id': req.params.columnId
        },
        { 'columns':{ $elemMatch: {'_id': req.params.columnId}}},
        function (err, doc) {
            console.log(doc);
        }
    )
        .then(column => {
            res.json(column)
        })
        .catch(err => console.log(err))
})

router.post('/:boardId', async (req, res) => {
    try {
        const column = await Boards.findOneAndUpdate({
            _id: req.params.boardId,
            'columns.name': { $ne: req.body.name }
        },
            { $addToSet: { columns: req.body } },
            { new: true },
            function (err, doc) {
                console.log(doc);
                if (doc == null) {
                    console.log('Name is already taken.')
                }
                else {
                    console.log('dskjtanherk');
                }
            })
        res.send(column);
    } catch {
        res.json({ message: err });
    }
})

router.put('/:boardId/:columnId', async (req, res) => {
    try {
        const column = await Boards.findOneAndUpdate(
            {
                '_id': req.params.boardId,
                'columns._id': req.params.columnId,
                'columns.name': { $ne: req.body.name }
            },
            { $set: { 'columns.$.name': req.body.name } },
            function (err, doc) {
                console.log(doc);
                if (doc == null) {
                    res.status(401).send('Invalid Password')
                }
                else {
                    console.log('dskjtanherk');
                }
            })
        res.send(column);
    } catch {
        res.json({ message: err });
    }
})

router.delete('/:boardId/:columnId', (req, res) => {
    const removedColumn = Boards.update({ _id: req.params.boardId },
        {
            $pull: { columns: { _id: req.params.columnId } }
        },
        function (err, result) {
            console.log(err);
            console.log(result);
        }
    )
        .then(column => {
            res.json(column)
        })
        .catch(err => console.log(err))
})

module.exports = router;