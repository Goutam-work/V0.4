const db = require('../connection');
const express = require('express'); 

exports.getSports = (callback) => {
  const qry = `SELECT * FROM sports`;
  return new Promise ( (resolve, reject) => {
    db.query(qry,(err, result) => {
      if(err){
      reject(err);
    }
    else{
      resolve(result);
    }
  });
  })
}

exports.getUser = (user,callback) => {

    var qry = `SELECT * FROM users WHERE  id = ${user.id}`;
    db.query(qry,(err, result) => {
        if(err){
        callback(err, null);
      }
      else{
        callback(null, result)
      }
    });
}