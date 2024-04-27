//const mysql = require('mysql');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const checkDB = require('./checkDB');

dotenv.config()
const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        multipleStatements: true
    });

    const dbExists = await checkDB(connection);

    if(dbExists) {
        console.log('Connected and created the database');
    } else {
        console.log('Connected to the database');
    }

    return connection;
}

module.exports = connectDB