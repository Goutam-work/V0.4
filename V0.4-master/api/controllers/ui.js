const express = require('express'); 
// Import user model
const uiModel = require('../model/ui');
const cookieParser = require('cookie-parser')
const UiApi = {};

// Handle index actions
UiApi.getSports = function(result) {
    uiModel.getSports()
    .then( data => {
        result(null,data)
    })
    .catch ( error => {
        result(error,null)
    });
};

UiApi.getAllSports = function(req,res) {
    uiModel.getSports()
    .then( data => {
        res.status(202).json({
            status:true,
            data:data
          });
    })
    .catch ( error => {
        res.status(500).json({
            status:false,
            message:error.message
          });
    });
};

UiApi.setCart = function(req,res) {
    const item = JSON.parse(req.body.item);
    const cart_items = req.cookies.carts;
    const cart = [];
    console.log(cart_items);
    if (cart_items == undefined){
        cart.push(item);   
        res.cookie("carts",cart, {maxAge: 360000});
        //console.log(cart_items);
    }else{
        cart_items.push(item);
        res.cookie("carts",cart_items, {maxAge: 360000});
        //console.log(cart_items);
    } 
    //console.log(cart_items);
    //console.log(carts);
    res.status(200).json({
        status:true,
        message:"added to cart successfull"
    });
    
    // uiModel.getSports()
    // .then( data => {
    //     result(null,data)
    // })
    // .catch ( error => {
    //     result(error,null)
    // });
};

UiApi.getCart = function(cart_cookies,result) {
    let cart = [];
    cart = cart_cookies;
    result(null,cart);
    // uiModel.getCart()
    // .then( data => {
    //     result(null,data)
    // })
    // .catch ( error => {
    //     result(error,null)
    // });
};

module.exports = UiApi;