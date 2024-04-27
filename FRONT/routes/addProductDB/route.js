const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {
    const addProduct = async () => {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ libelle: req.body.libelle, price: req.body.price, category: req.body.category, description: req.body.description, images: req.body.images})
        });

        if (response.ok) {
            console.log(await response.text());
            return true;
        } else {
            return false;
        }
    }

    if(await addProduct()) {
        res.redirect('/');
    } else {
        res.send('Erreur lors de l\'ajout du produit');
    }
})

module.exports = app;