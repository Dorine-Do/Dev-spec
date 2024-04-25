const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const checkDB = require('./checkDB');

dotenv.config()

const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        multipleStatements: true
    })

    try {
        connection.connect()
        if(checkDB(connection)) {
            console.log('Connected and created the database')
            return true
        } else {
            console.log('Connected to the database')
        }
    } catch(err) {
        console.error('Error connecting to the database: ' + err)
        return false
    }
}

module.exports = connectDB