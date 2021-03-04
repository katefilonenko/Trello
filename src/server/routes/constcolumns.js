const express = require('express');
const Boards = require('../models/board2');

const columnCreate = async (columnDets, req, res) => {
    try{
        let nameNotTaken = await validateName(columnDets.name);
        if (!nameNotTaken) {
            return res.status(401).send('Name is already taken.')
        }

        const newColumn = new Boards({
            ...columnDets
        });

        await newColumn.save()
        return res.status(201).json({
            message: "You are successfully created column",
            success: true
        });

    }catch (err) {
        return res.status(500).json({
            message: "Unable to create your column.",
            success: false
        });
    }
}

const validateName = async name => {
    let user = await Boards.findOne({ boardId},
        {name})
    console.log(req.params.boardId);
    console.log(req.body.name);
    return user ? false : true; 
};

module.exports = {
    columnCreate
};