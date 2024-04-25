// const mysql = require('mysql');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const checkDB = require('./checkDB');
const createDB = require('./createBD');

dotenv.config()
const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
    })

    try {
        connection.connect()
        try {
            await connection.query('CREATE DATABASE IF NOT EXISTS SnackKing')
            checkDB(connection)
        } catch (err) {
            console.error('Error creating database after connexion: ' + err)
        }
    } catch(err) {
        console.error('Error connecting to the database: ' + err)
    }

    // createDB(connection)

    // connection.connect(async (err) => {
    //     if(err) {
    //         console.error('Error connecting to the database: ' + err)
    //         reject(err)
    //     } else {
    //         console.log('Connected to the database')
    //         resolve()
    //         // try {
    //         //     await checkDB(connection)
    //         //     resolve()
    //         // } catch(err) {
    //         //     console.error('Failed to connect to the database: ' + err)
    //         //     reject(err)
    //         // }
    //     }
    // })
}

connectDB()

module.exports = connectDB