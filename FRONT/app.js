const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const fetch = require('node-fetch')

const  LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const brcypt = require('bcrypt');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.listen(3000, 'localhost', () => {
    console.log('Server is running on port 3000');
});

// CSP css / js / form
// Le navigateur va check si les forms proviennent bien de nous
// Toutes les balises style/script inline, script doivent avoir en attribut 'nonce' avec en value la string générée avec Math.random
// Si vous voulez faire du style inline sur une page, dans son 'render' en back il faudra rajouter : cspNonce = req.nonce
// Cela va transmettre au front la string générée et dans la balise style/script, il faudra rajouter en attribut : nonce = cspNonce 
app.use((req, res, next,) => {
    // subString 2 car sinon pas assez complexe
    const nonce = (Math.random() + 1).toString(36).substring(2);
    req.nonce = nonce;
    // Checked avec https://csp-evaluator.withgoogle.com/
    res.appendHeader('Content-Security-Policy', `form-action 'self'; style-src 'nonce-${nonce}' https://cdn.jsdelivr.net; script-src 'nonce-${nonce}' https://cdn.jsdelivr.net 'strict-dynamic' 'unsafe-inline'; object-src 'none'; base-uri 'self'; `)
    next();
})

app.get('/', async (req, res) => {

    const fetchAllProducts = async () => {
        const response = await fetch('http://localhost:5000/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const products = await response.json();

        return products;
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

        // console.log(categories)

        const uniqueCategories = categories.filter((category, index, self) =>
            index === self.findIndex((c) => (
                c.category === category.category
            ))
        );

        // console.log(uniqueCategories)

        return uniqueCategories;
    }
   
    res.render('accueil', {cspNonce: req.nonce, allProducts: await fetchAllProducts(), allCategories: await fetchAllCategories()}); // Affichage page d'accueil avec filtre produit

});

app.use('/filtre', require('./routes/filtre/route'))

app.use('/search', require('./routes/search/route'))

app.use('/modifProduit', require('./routes/modifProduit/route'))

app.use('/modifProduitID', require('./routes/modifProduitID/route'))

app.use('/deleteProduit', require('./routes/delete/route'))

app.use('/addProduct', require('./routes/addProduct/route'))

app.use('/addProductDB', require('./routes/addProductDB/route'))

app.use('/addCart', require('./routes/addCart/route'))

//CONNEXION//
//----------------------------------------------------------//

app.use('/connexion', require('./routes/connexion/route'));

//INSCRIPTION//
//----------------------------------------------------------//

app.use('/inscription', require('./routes/inscription/route'));

// body-parser pour récup les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));








//DECONNEXION//
//----------------------------------------------------------//

app.get('/deconnexion', (req, res) => {
    // Delete token CSRF
    res.redirect('/accueil');
});

