const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Register route')
})

app.post('/', async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    }

    // Insert user in the database
    try {
        const connection = await connectDB()
        await connection.query(`
            INSERT INTO User (firstname, lastname, email, password, adress, phone, isAdmin)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [userData.firstName, userData.lastName, userData.email, userData.password, userData.address, userData.phone, userData.isAdmin])
        console.log('User inserted in the database')
        res.status(201).json({ message: 'User inserted in the database'})
    } catch (error) {
        console.error('Failed to insert user in the database: ' + error)
        res.status(500).json({ message: 'Failed to insert user in the database'})
    }
})



module.exports = app