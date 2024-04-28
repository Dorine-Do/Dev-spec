const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {

    const putProduct = async () => {
        const response = await fetch(`http://localhost:5000/products/${req.body.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id: req.body.id, libelle: req.body.libelle, price: req.body.price, category: req.body.category, description: req.body.description, images: req.body.images})
        });

        if (response.ok) {
            console.log(await response.text());
            return true;
        } else {
            return false;
        }
    }

    if(await putProduct()) {
        res.redirect('/');
    } else {
        res.send('Erreur lors de la modification du produit');
    }
})

module.exports = app;