const express = require('express');
const app = express();
const connectDB = require('./utils/connectDB')

app.get('/', async (req, res) => {
    res.send('API BACK')
    try {
        await connectDB()
        console.log('Connected to the database')
    } catch (error) {
        console.log('Failed to connect to the database: ' + error)
    }
})

app.listen(5000, 'localhost', () => {
    console.log('Server is running on port 5000');
});