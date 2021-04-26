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
            // function (err, doc) {
            //     console.log(doc);
            //     if (doc == null) {
            //         return res.status(401).send('Name is already taken.')
            //     }
            //     else {
            //         console.log('dskjtanherk');
            //     }
            // }
            )
        res.send(task);
    } catch {
        res.json({ message: err });
    }
})

// function swapTasks(task1, task2){
//     swap1;
//     swap2;
// }

// router.get('/:boardId/:columnId', (req, res) => {
//     Boards.find(
//         {
//             '_id': req.params.boardId,
//             'columns._id': req.params.columnId
//         },
//         { 'columns':{ $elemMatch: {'_id': req.params.columnId}}},
//         {
//             task1: req.body.task1,
//             task2: req.body.task2
//         },
//         function (err, doc, task1, task2) {
//             console.log(doc);
//             swap1 = doc.tasks[task1];
//             sawp2 = doc.tasks[task2];
//             doc.tasks.set(task1, swap2);
//             doc.tasks.set(task2, swap1);
//             doc.save();
//         }
//     )
//         .then(column => {
//             res.json(column)
//         })
//         .catch(err => console.log(err))
// })


module.exports = router;