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
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images
    }

    try {
        const connection = await connectDB()
        await connection.query(`
            INSERT INTO Products (name, description, price, images)
            VALUES (?, ?, ?, ?)
        `, [productData.name, productData.description, productData.price, productData.images])
        res.status(201).send('Product inserted in the database')
    } catch (error) {
        console.error('Failed to insert product in the database: ' + error)
        res.status(500).send('Failed to insert product in the database')
    }
})

app.put('/:id', async (req, res) => {
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images
    }

    try {
        const connection = await connectDB()
        await connection.query(`
            UPDATE Products
            SET name = ?, description = ?, price = ?, images = ?
            WHERE id = ?
        `, [productData.name, productData.description, productData.price, productData.images, req.params.id])
        res.status(200).send('Product updated in the database')
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