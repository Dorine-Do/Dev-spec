const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const checkDB = require('./checkDB');

dotenv.config()

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PSWD,
            multipleStatements: true
        });

        const dbExists = await checkDB(connection);

        if(dbExists) {
            console.log('Connected and created the database');
        } else {
            console.log('Connected to the database');
        }

        return connection;
    } catch(err) {
        console.error('Error connecting to the database: ' + err);
        return null;
    }
}

module.exports = connectDB