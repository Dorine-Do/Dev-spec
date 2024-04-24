const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const checkDB = require('./checkDB')

dotenv.config()

const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tp'
    })

    connection.connect(async (err) => {
        if(err) {
            console.error('Error connecting to the database: ' + err)
            reject(err)
        } else {
            console.log('Connected to the database')
            try {
                await checkDB(connection)
                resolve()
            } catch(err) {
                console.error('Failed to connect to the database: ' + err)
                reject(err)
            }
        }
    })
}

module.exports = connectDB