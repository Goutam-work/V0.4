const express = require('express'); 
// Import user model
const sportsModel = require('../model/sportsModel');

// Handle index actions
exports.getArena =(req,res) => {

   if(req.body.sport == undefined){
    req.body.sport =0;
   }
   if(req.body.locality == undefined){
    req.body.locality =0;
   }
    sportsModel.getArena(req.body.sport,req.body.dateofbooking,req.body.locality)
    .then( data => {
        //console.log(data);
        res.status(200).json({
            status:true,
            data:data
            });
    })
    .catch ( error => {
        console.log(error);
        res.status(500).json({
            status:false,
            message:error.message
            });
    });
};

exports.getCourts =(req,res) => {
    console.log(req.body);
    if(req.body.sports_id == undefined){
     req.body.sports_id =0;
    }
    if(req.body.arena_id == undefined){
     req.body.arena_id =0;
    }
     sportsModel.getCourts(req.body.sports_id,req.body.arena_id)
     .then( data => {
         res.status(200).json({
             status:true,
             data:data
             });
     })
     .catch ( error => {
         console.log(error);
         res.status(500).json({
             status:false,
             message:error.message
             });
     });
 };

exports.getSportsArena =(req,res) => {

    if(req.body.arena_id == undefined){
     req.body.arena_id =0;
    }
     sportsModel.getSportsArena(req.body.arena_id)
     .then( data => {
         //console.log(data);
         res.status(200).json({
             status:true,
             data:data
             });
     })
     .catch ( error => {
         console.log(error);
         res.status(500).json({
             status:false,
             message:error.message
             });
     });
 };

exports.getCourtSlots =(req,res) => {
    datetime = new Date();
    if(req.body.court_id == undefined){
        req.body.court_id = 0;
    }
    if(req.body.book_date == undefined){
        req.body.book_date = datetime.toISOString().slice(0,10);
    }
    sportsModel.getCourtSlots(req.body.court_id,req.body.book_date)
    .then( data => {
        //console.log(data);
        res.status(200).json({
            status:true,
            data:data
            });
    })
    .catch ( error => {
        console.log(error);
        res.status(500).json({
            status:false,
            message:error.message
            });
    });
};