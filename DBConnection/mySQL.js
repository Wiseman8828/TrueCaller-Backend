const mysql = require('mysql2/promise');
const { MYSQL } = require('../config');
let pool;

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * @description To initialize the data base connection
 * ---------------------------------------------------------------------------------------------------------------------
 */
const init = async () => {
    return new Promise((resolve, reject) => {
        try {
            let poolConfig = {
                host:  MYSQL.host,
                user: MYSQL.user,
                password: MYSQL.password,
                database: MYSQL.database,
                connectionLimit: 1,
            };
            pool = mysql.createPool(poolConfig);
            console.log('Created mysql connection with ' + poolConfig.host + ' using db ' + poolConfig.database);
            resolve()
        } catch (error) {
            reject(error)   
        }
    }) 
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * @description To execute any query with provided data as prepared statement
 * ---------------------------------------------------------------------------------------------------------------------
 * 
 * @param {String} query Query to execute
 * @param {Array} data Prepared statement data to send in query
 * @returns {Promise<FieldPacket[]>}
 */
const execute = async (query, data) => {
    return pool.query(query, data);
}

module.exports = {
    init: init,
    execute: execute,
}