const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config()

const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tp'
    })

    connection.connect((err) => {
        if(err) {
            console.error('Error connecting to the database: ' + err)
            reject(err)
        } else {
            console.log('Connected to the database')
            resolve()
        }
    })
}

module.exports = connectDB