const mysql = require('mysql');
const {promisify} = require('util')
const {database} = require('../conf/keys');

const pool = mysql.createPool(database);
pool.getConnection((err,connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSES')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }

    }

    if(connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
});

//Promisify Pool Querys
pool.query = promisify(pool.query);
module.exports = pool;