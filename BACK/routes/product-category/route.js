const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')

app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT category FROM Products`)
            .then(([category]) => {
                res.status(200).send(category)
            })
            .catch(error => {
                console.error('Failed to display all products: ' + error)
                res.status(500).send('Failed to display all products')
            })
        
    } catch (error) {
        console.error('Failed to display all product: ' + error)
    }
})

module.exports = app;