const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {
    res.render('modifProduit', {cspNonce: req.nonce, id: req.body.id, libelle: req.body.libelle, price: req.body.price, category: req.body.category, description: req.body.description, images: req.body.images}); // Affichage page d'accueil avec filtre produit
})

module.exports = app;