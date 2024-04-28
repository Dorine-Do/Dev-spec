const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')
const products = require('../products/route')

const {createProducts} = require('../../utils/createBD');


app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT COUNT(libelle) as compte, category as name FROM Products GROUP BY name`)
            .then(([response]) => {
                res.send(response);
            })
            .catch(error => {
                console.error('Failed to display all products: ' + error)
            })
        
    } catch (error) {
        console.error('Failed to display all product: ' + error)
    }
})

module.exports = app