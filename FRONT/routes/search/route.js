const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {
    
        const search = req.body.search;
    
        const fetchSearchedProducts = async () => {
            const response = await fetch(`http://localhost:5000/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const products = await response.json();
    
            const searchedProducts = products.filter(product => product.libelle.toLowerCase().includes(search.toLowerCase()));
    
            return searchedProducts;
        }
    
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
    
        res.render('accueil', {cspNonce: req.nonce, allProducts: await fetchSearchedProducts(), allCategories : await fetchAllCategories()}); // Affichage page d'accueil avec filtre produit
});

module.exports = app;