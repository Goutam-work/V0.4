const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

connection.connect( err => {
    if(err){
        console.log(err);
    } else {
        console.log('connected');
        
    }
})


module.exports = connection;