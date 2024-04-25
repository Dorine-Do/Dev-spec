const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Product route')
})

module.exports = app