const express = require('express');
const Boards = require('../models/board2');

const boardCreate = async (boardDets, req, res) => {
    try {
        let nameNotTaken = await validateName(boardDets.name);
        if (!nameNotTaken) {
            return res.status(401).send('Name is already taken.')
        }

        const newBoard = new Boards({
            ...boardDets
        });

        await newBoard.save()
        return res.status(201).json({
            message: "You are successfully created board",
            success: true
        });

    } catch (err) {
        return res.status(500).json({
            message: "Unable to create your board.",
            success: false
        });
    }
}

const validateName = async name => {
    let user = await Boards.findOne({ name },{ new: true });
    console.log(user);
    return user ? false : true;
};

module.exports = {
    boardCreate
};