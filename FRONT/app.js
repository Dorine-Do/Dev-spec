const express = require('express');
// const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const csrf = require('csurf');
const jwt = require ('jsonwebtoken');

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
app.get('/', (req, res) => {
   
    res.render('index', {cspNonce: req.nonce}); // Affichage page d'accueil avec filtre produit

});

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
    // Vérification si l'utilisateur existe ou non
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            // Génération du token JWT
            const token = generateToken({ email: user.email });
            // Token JWT dans un cookie de session
            res.cookie('jwt', token, { httpOnly: true });
            // Redirection vers la page d'accueil
            res.redirect('/accueil');
        } else {
            res.send("Email ou mot de passe incorrect");
        }
    });
});


//COOKIE CSRF//
//----------------------------------------------------------//
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());

app.get('/inscription', csrfProtection, function (req, res) {
    res.render('inscription', {csrfToken: req.csrfToken() });
});

app.get('/connexion', csrfProtection, function (req, res) {
    res.render('connexion', {csrfToken: req.csrfToken() });
});

app.post('/inscription', csrfProtection, parseForm, function (req, res) {
    if(req.csrfToken()) {
        res.send('Formulaire soumis avec succès');
    } else {
        res.status(403).send('Jeton invalide');
    }
});

app.post('/connexion', csrfProtection, parseForm, function (req, res) {
    if(req.csrfToken()) {
        res.send('Formulaire soumis avec succès');
    } else {
        res.status(403).send('Jeton invalide');
    }
});


//DECONNEXION//
//----------------------------------------------------------//
app.get('/deconnexion', (req, res) => {
    // Supprimer le cookie et le token JWT
    res.clearCookie('jwt');
    // Redirection vers page d'accueil
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
