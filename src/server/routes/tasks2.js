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

//получить карточку по id (исходная)
// router.get('/:id', async (req, res) => {
//     try {
//         const tasks = await Tasks.findById(req.params.id);
//         res.send(tasks);
//     } catch {
//         res.json({ message: err });
//     }

// });

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

//добавление карточки в колонку (исходная с другой коллекцией)
// router.post('/:id', (req, res) => {
//     const task = new Tasks({
//         id: req.body.id,
//         name: req.body.name,
//     });

//     task.save()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: err })
//         })
// })

//рабочая ф-ия добавления карточки в выбранную колонку c проверкой имени на уникальность
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
        // res.send(task);
    } catch {
        res.json({ message: err });
    }
})


//изменение карточки по id (исходная с другой коллекцией)
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedTask = await Tasks.updateOne(
//             { _id: req.params.id },
//             {
//                 $set: {
//                     name: req.body.name
//                 }
//             }
//         );
//         res.send(updatedTask);
//     } catch {
//         res.json({ message: err });
//     }
// });

//рабочая ф-ия изменения карточки в выбранной колонке
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
                    return res.status(401).send('Name is already taken.')
                }
                else {
                    console.log('dskjtanherk');
                }
            })
        // res.send(task);
    } catch {
        res.json({ message: err });
    }
})

//рабочая ф-ия удаления карточки из колонки
router.delete('/:boardId/:columnId/:taskId', (req, res) => {

    Boards.update(
        {
            '_id': req.params.boardId,
            'columns._id': req.params.columnId,
            'columns.tasks._id': req.params.taskId
        },
        {$pull:  {'columns.$.tasks': {_id: req.params.taskId}}},
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

//удаление карточки по id (исходная с другой коллекцией)
// router.delete('/:id', async (req, res) => {
//     try {
//         const removedTask = await Tasks.remove({ _id: req.params.id });
//         res.send(removedTask);
//     } catch {
//         res.json({ message: err });
//     }
// });

module.exports = router;