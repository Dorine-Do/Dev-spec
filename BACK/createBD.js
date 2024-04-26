const connectDB = require('connectDB')

const createDB = async () => {
    try {
        await connectDB()
        console.log('Connected to the database')
    } catch (error) {
        console.log('Failed to connect to the database: ' + error)
    }


}

module.exports = createDB