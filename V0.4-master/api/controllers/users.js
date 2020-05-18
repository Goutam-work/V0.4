const express = require('express'); 
// Import user model
const userModel = require('../model/user');

// Handle index actions
exports.index = function (req, res) {
    userModel.getUsers()
    .then( result => {
        res.status(200).json({
            users: result
        })
    })
    .catch ( error => {
        res.status(500).json({
            message: "cannot fetch users"
        }) 
    })
};

