const express = require('express');
// const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

const fetch = require('node-fetch')

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

// // Configuration de la base de données
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'database'
// });

// // Connexion à la base de données
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connexion réussi');
// });
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

app.get('/test', (req, res) => {
   
    res.render('test', {cspNonce: req.nonce}); // Affichage page d'accueil avec filtre produit

});

//INSCRIPTION//
//----------------------------------------------------------//

// body-parser pour récup les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/inscription', (req, res) => {
    const { prenom, nom, email, phone, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        res.send("Les mots de passe ne correspondent pas");
    } else {
        // Insérer les données dans la BDD
        const user = { prenom, nom, email, phone, password };
        connection.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) throw err;
            console.log('Utilisateur inséré avec succès');
            res.send('Inscription réussie !');
        });
    }
});


//CONNEXION//
//----------------------------------------------------------//

app.post('/connexion', (req, res) => {


    
    const { email, password } = req.body;
    // Verif si user exist ou pas
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // Génération token random
            const csrfToken = Math.random().toString(36).substring(2);
            // Redirection  automatique si token valid
            res.redirect(`/accueil?csrfToken=${csrfToken}`);
        } else {
            // Utilisateur non trouvé, afficher un message d'erreur
            res.send("Email ou mot de passe incorrect");
        }
    });
});




//DECONNEXION//
//----------------------------------------------------------//

app.get('/deconnexion', (req, res) => {
    // Delete token CSRF
    res.redirect('/accueil');
});



//FILTRE PRODUIT//
//----------------------------------------------------------//

// app.get('/filtrer', (req, res) => {
//     const categorie = req.query.categorie;
//     let sql = 'SELECT * FROM produits';
//     if (categorie) {
//         sql += ` WHERE categorie = '${categorie}'`;
//     }
//     connection.query(sql, (err, result) => {
//         if (err) throw err;
//         res.render('accueil', { products: result, csrfToken: req.query.csrfToken }); // Affichage page d'accueil avec filtre produit
//     });
// });
