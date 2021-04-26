const express = require('express');
const router = express.Router();
const Boards = require('../models/board2');

router.put('/:boardId/:columnId/:tasksId', (req, res) => {
    // try {
        Boards.findOneAndUpdate(
            {
                '_id': req.params.boardId,
                'columns._id': req.params.columnId,
                'columns.tasks._id': req.params.tasksId
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
            })
            .then(column => {
                res.json(column)
            })
            .catch(err => console.log(err))
   
})

module.exports = router;