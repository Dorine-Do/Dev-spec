const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')
const bcrypt = require('bcrypt')
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Login route')
})

app.post('/', async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    // res.send('Received user data: ' + JSON.stringify(userData))

    // Check if the user exists in the database
    try {
        const connection = await connectDB()
        const [users] = await connection.query(`
            SELECT * FROM User WHERE email = ?
        `, [userData.email, userData.password])
        if (users.length > 0) {
            const match = await bcrypt.compare(userData.password, users[0].password)
            if (match) {
                res.status(200).json({ message: 'User logged in'})
            } else {
                res.status(401).json({ message: 'Invalid password'})
            }
        } else {
            res.status(404).send('User not found')
        }
    } catch (error) {
        console.error('Failed to check user in the database: ' + error)
    }
})

module.exports = app