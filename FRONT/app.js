const express = require('express');
const app = express();
const session = require('express-session')
const fetch = require('node-fetch')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Définie le engine template
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000, 'localhost', () => {
    console.log('Server is running on port 3000');
});

// middleware --------------------------------------------------------------------------------------------------------------------------
// CSP 
// css / js / form
// Le navigateur va check si les forms proviennent bien de nous
// Toutes les balises style/script inline, script doivent avoir en attribut 'nonce' avec en value la string générée avec Math.random
// Si vous voulez faire du style inline sur une page, dans son 'render' en back il faudra rajouter : cspNonce = req.nonce
// Cela va transmettre au front la string générée et dans la balise style/script, il faudra rajouter en attribut : nonce = cspNonce 
app.use((req, res, next,) => {
    // subString 2 car sinon pas assez complexe
    const nonce = (Math.random() + 1).toString(36).substring(2);
    req.nonce = nonce;

    // Checked avec https://csp-evaluator.withgoogle.com/
    res.appendHeader('Content-Security-Policy', `form-action 'self'; img-src 'self'; style-src 'nonce-${nonce}' https://cdn.jsdelivr.net; script-src 'nonce-${nonce}' https://cdn.jsdelivr.net 'strict-dynamic' 'unsafe-inline'; object-src 'none'; base-uri 'self'; `)
    
    // Chrome ?
    // res.appendHeader('Reporting-Endpoints', 'nom-groupe-csp="votre-url"');

    next();
})

// SESION
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session.email;
    next();
});


//RENDER --------------------------------------------------------------------------------------------------------------------------

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
    const allProducts = await fetchAllProducts()
    const allCategories = await fetchAllCategories()
   
    res.render('accueil', {cspNonce: req.nonce, allProducts: allProducts, allCategories: allCategories}); // Affichage page d'accueil avec filtre produit

});

app.get('/cart', (req, res) => {
    res.render('cart', { cspNonce: req.nonce });
});

app.get('/stats', async (req, res) => {   
    const rep = await fetch('http://localhost:5000/stats')
    const products = await rep.json();
    res.status(200).json(products)

});


app.get('/test', async (req, res) => {
    const response = await fetch('http://localhost:5000/product-category')
    res.render('test', {
        cspNonce: req.nonce
    });

});

// ACTIONS ---------------------------------------------------------------------

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
// app.use(bodyParser.urlencoded({ extended: true }));

//DECONNEXION//
//----------------------------------------------------------//

app.get('/deconnexion', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/');
        }
    });
});

