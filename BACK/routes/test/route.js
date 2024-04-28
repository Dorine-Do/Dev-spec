const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')
const products = require('../products/route')

const {createProducts} = require('../../utils/createBD');


app.use(express.json())

app.post('/test', (req, res)=> {
    const { data } = req.body;
    res.send('Fetch fonctionel entre 3000 et 5000')
})

module.exports = app