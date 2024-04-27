const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {
    const delProduct = async () => {
        const response = await fetch(`http://localhost:5000/products/${req.body.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            console.log(await response.text());
            return true;
        } else {
            return false;
        }
    }

    if(await delProduct()) {
        res.redirect('/');
    } else {
        res.send('Erreur lors de la suppression du produit');
    }
})

module.exports = app;