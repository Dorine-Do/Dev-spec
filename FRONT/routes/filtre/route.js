const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {

    // console.log(req.body)

    const category = req.body.category;

    const fetchFilteredProducts = async () => {
        const response = await fetch('http://localhost:5000/product-filtre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ category })
        });
        const filteredProducts = await response.json();

        return filteredProducts;
    }

    // console.log(await fetchFilteredProducts())

     const fetchAllCategories = async () => {
        const response = await fetch('http://localhost:5000/product-category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const categories = await response.json();

        const uniqueCategories = categories.filter((category, index, self) =>
            index === self.findIndex((c) => (
                c.category === category.category
            ))
        );

        return uniqueCategories;
    }


    //console.log(await fetchFilteredProducts())

    res.render('accueil', {cspNonce: req.nonce, allProducts: await fetchFilteredProducts(), allCategories : await fetchAllCategories()}); // Affichage page d'accueil avec filtre produit
})

module.exports = app;