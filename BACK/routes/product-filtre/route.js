const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')

app.use(express.json())


app.post('/', async (req, res) => {
    const category = req.body.categorie;

    if (category === "") {
        res.status(200).send("Please select a category")
    }

    let query = 'SELECT * FROM Products';
    if (category) {
        query += ` WHERE category = '${category}'`;
    }
    try {
        const connection = await connectDB()
        await connection.query(query)
            .then(([products]) => {
                res.status(200).send(products)
            })
            .catch(error => {
                console.error('Failed to filter products: ' + error)
                res.status(500).send('Failed to filter products')
            })
        
    } catch (error) {
        console.error('Failed to filter products: ' + error)
    }
});

module.exports = app