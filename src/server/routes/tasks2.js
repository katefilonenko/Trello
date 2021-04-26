const express = require('express');
const router = express.Router();
const Boards = require('../models/board2');

router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.json(tasks);
    } catch {
        res.json({ message: err });
    }
})


router.get('/:boardId/:columnId/:taskId', (req, res) => {
    Boards.find(
        {
            '_id': req.params.boardId,
            'columns._id': req.params.columnId,
            'columns.tasks._id': req.params.taskId
        },
        { 'tasks': { $elemMatch: { '_id': req.params.taskId } } },
        function (err, doc) {
            console.log(doc);
        }
    )
        .then(task => {
            res.json(task)
        })
        .catch(err => console.log(err))
})

router.post('/:boardId/:columnId', async (req, res) => {
    try {
        const task = await Boards.findOneAndUpdate(
            {
                '_id': req.params.boardId,
                'columns._id': req.params.columnId,
                'columns.tasks.name': { $ne: req.body.name }
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
    }
    catch {
        res.json({ message: err });
    }

    // .then(task => {
    //     res.json(task)
    // })
    // .catch(err => console.log(err))
})

router.put('/:boardId/:columnId/:tasksId', async (req, res) => {
    try {
        const task = await Boards.findOneAndUpdate(
            {
                '_id': req.params.boardId,
                'columns._id': req.params.columnId,
                'columns.tasks._id': req.params.tasksId,
                'columns.tasks.name': { $ne: req.body.name }
            },
            {
                $set: {
                    'columns.$[e1].tasks.$[e2].name': req.body.name,
                    'columns.$[e1].tasks.$[e2].description': req.body.description,
                    'columns.$[e1].tasks.$[e2].date': req.body.date,
                    'columns.$[e1].tasks.$[e2].comment': req.body.comment
                }
            },
            {
                arrayFilters: [
                    { 'e1._id': req.params.columnId },
                    { 'e2._id': req.params.tasksId }
                ]
            },
            function (err, doc) {
                console.log(doc);
                if (doc == null) {
                    return res.status(401).send('Name is already taken')
                }
                else {
                    console.log('dskjtanherk');
                }
            })
        res.send(task);
    }
    catch {
        res.json({ message: err });
    }
})


router.delete('/:boardId/:columnId/:taskId', (req, res) => {

    Boards.update(
        {
            '_id': req.params.boardId,
            'columns._id': req.params.columnId,
            'columns.tasks._id': req.params.taskId
        },
        { $pull: { 'columns.$.tasks': { _id: req.params.taskId } } },
        function (error, result) {
            console.log(error);
            console.log(result);
        }
    )
        .then(task => {
            res.json(task)
        })
        .catch(err => console.log(err))
})

module.exports = router;