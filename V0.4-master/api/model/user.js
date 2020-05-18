const db = require('../connection');
const express = require('express'); 

exports.getUsers = (callback) => {
  const qry = `SELECT * FROM user`;
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
