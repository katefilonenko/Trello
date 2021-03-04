const { NullTemplateVisitor } = require('@angular/compiler');
const express = require('express');
const router = express.Router();
const Boards = require('../models/board2');

const {
    columnCreate,
  } = require("./constcolumns");

// router.get('/get/:boardId', (req, res) => {
//     Boards.find
// })

//получить доску по id (исходная)
// router.get('/:columnId', async (req, res) => {
//     try {
//         const id = req.params.columnId;
//         const column = await Columns.findById(id);
//         res.send(column);
//     } catch {
//         res.json({ message: err });
//     }
// });

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

//рабочая ф-ия добавления колонки в выбранную доску
// router.post('/:boardId', (req, res) => {
//     Boards.findOneAndUpdate({ _id: req.params.boardId },
//         { $addToSet: { columns: req.body } },
//         function (err, doc) {
//             console.log(doc);
//         })
//         .then(column => {
//             res.json(column)
//         })
//         .catch(err => console.log(err))
// })

//рабочая ф-ия добавления колонки в выбранную доску с уникальным именем
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
                    return res.status(401).send('Name is already taken.')
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

// router.post('/:boardId', (req, res) => {
//     columnCreate(req.body, "user", res);
// })

//изменение колонки по id (исходная с другой коллекцией)
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedColumn = await Columns.updateOne(
//             { _id: req.params.id },
//             {
//                 $set: {
//                     name: req.body.name
//                 }
//             }
//         );
//         res.send(updatedColumn);
//     } catch {
//         res.json({ message: err });
//     }

// });

//рабочая ф-ия изменения колонки
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
                    return res.status(401).send('Name is already taken.')
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

//рабочая ф-ия удаления колонки
router.delete('/:boardId/:columnId', (req, res) => {
   
    Boards.update({ _id: req.params.boardId },
        {
            $pull: { columns: { _id: req.params.columnId } }
        }, function (error, result) {
            console.log(error);
            console.log(result);
        })
})

//удаление колонки по id (исходная с другой коллекцией)
// router.delete('/:columnId', async (req, res) => {
//     try {
//         // const id = req.params.columnId;
//         const removedColumn = await Columns.remove({ _id: req.params.columnId });
//         res.send(removedColumn);
//     } catch {
//         res.json({ message: err });
//     }
// });

module.exports = router;