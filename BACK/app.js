const express = require('express');
const app = express();
const connectDB = require('./utils/connectDB')

const registerRoute = require('./routes/register/route')
const loginRoute = require('./routes/login/route')

app.use('/register', registerRoute)

app.use('/login', loginRoute)

app.get('/', async (req, res) => {
    res.send('API BACK')
    try {
        await connectDB()
        console.log('Connected')
    } catch (error) {
        console.log('Failed to connect to the database: ' + error)
    }
})

app.listen(5000, 'localhost', () => {
    console.log('Server is running on port 5000');
});