const express = require('express');
const app = express();
const connectDB = require('../../utils/connectDB')

app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT * FROM Products`)
            .then(([products]) => {
                res.status(200).send(products)
            })
            .catch(error => {
                console.error('Failed to display all products: ' + error)
                res.status(500).send('Failed to display all products')
            })
        
    } catch (error) {
        console.error('Failed to display all product: ' + error)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`SELECT * FROM Products WHERE id = ?`, [req.params.id])
            .then(([product]) => {
                if (product.length > 0) {
                    res.status(200).send(product)
                } else {
                    res.status(404).send('Product not found')
                }
            })
            .catch(error => {
                console.error('Failed to display product: ' + error)
                res.status(500).send('Failed to display product')
            })
        
    } catch (error) {
        console.error('Failed to display product: ' + error)
    }
})

app.post('/', async (req, res) => {

    try {
        const connection = await connectDB()
        await connection.query(`
            INSERT INTO Products (libelle, description, price, images, category)
            VALUES (?, ?, ?, ?, ?)
        `, [req.body.libelle, req.body.description, req.body.price, req.body.images, req.body.category])
        res.status(200).json({ message: 'Product updated in the database' });
    } catch (error) {
        console.error('Failed to insert product in the database: ' + error)
        res.status(500).send('Failed to insert product in the database')
    }
})

app.put('/:id', async (req, res) => {

    try {
        const connection = await connectDB()
        await connection.query(`
            UPDATE Products
            SET libelle = ?, description = ?, price = ?, images = ?, category = ?
            WHERE id = ?
        `, [req.body.libelle, req.body.description, req.body.price, req.body.images, req.body.category ,req.body.id])
        res.status(200).json({ message: 'Product updated in the database' });
    } catch (error) {
        console.error('Failed to update product in the database: ' + error)
        res.status(500).send('Failed to update product in the database')
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const connection = await connectDB()
        await connection.query(`
            DELETE FROM Products
            WHERE id = ?
        `, [req.params.id])
        res.status(200).send('Product deleted from the database')
    } catch (error) {
        console.error('Failed to delete product from the database: ' + error)
        res.status(500).send('Failed to delete product from the database')
    }
})



module.exports = app