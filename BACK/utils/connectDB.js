// const mysql = require('mysql');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const checkDB = require('./checkDB');

dotenv.config()
const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'SnackKing'
    })

    try {
        try {
            await connection.query('CREATE DATABASE IF NOT EXISTS SnackKing')
            checkDB(connection)
        } catch (err) {
            console.error('Error creating database after connexion: ' + err)
        }
    } catch(err) {
        console.error('Error connecting to the database: ' + err)
    }
}
connectDB()
module.exports = connectDB