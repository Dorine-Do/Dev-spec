const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { response } = require('../BACK/routes/register/route');
const fetch = require('node-fetch');

// Définie le engine template
app.set('view engine', 'ejs');


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
    res.appendHeader('Content-Security-Policy', `form-action 'self'; style-src 'nonce-${nonce}' https://cdn.jsdelivr.net; script-src 'nonce-${nonce}' https://cdn.jsdelivr.net 'strict-dynamic' 'unsafe-inline'; object-src 'none'; base-uri 'self'; `)
    
    // Chrome ?
    // res.appendHeader('Reporting-Endpoints', 'nom-groupe-csp="votre-url"');

    next();
})



// Routes ----------------------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('accueil', {cspNonce: req.nonce});
});

app.get('/stats', async (req, res) => {   
    const rep = await fetch('http://localhost:5000/stats')
    const products = await rep.json();
    res.status(500).json(products)

});

app.get('/test', (req, res) => {
    res.render('test', {
        cspNonce: req.nonce
    });

});

//INSCRIPTION//
//----------------------------------------------------------//

// body-parser pour récup les données du formulaire
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/inscription', (req, res) => {
//     const { prenom, nom, email, phone, password, confirm_password } = req.body;
//     if (password !== confirm_password) {
//         res.send("Les mots de passe ne correspondent pas");
//     } else {
//         // Insérer les données dans la BDD
//         const user = { prenom, nom, email, phone, password };
//         connection.query('INSERT INTO users SET ?', user, (err, result) => {
//             if (err) throw err;
//             console.log('Utilisateur inséré avec succès');
//             res.send('Inscription réussie !');
//         });
//     }
// });


//CONNEXION//
//----------------------------------------------------------//

// app.post('/connexion', (req, res) => {


    
//     const { email, password } = req.body;
//     // Verif si user exist ou pas
//     connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//             // Génération token random
//             const csrfToken = Math.random().toString(36).substring(2);
//             // Redirection  automatique si token valid
//             res.redirect(`/accueil?csrfToken=${csrfToken}`);
//         } else {
//             // Utilisateur non trouvé, afficher un message d'erreur
//             res.send("Email ou mot de passe incorrect");
//         }
//     });
// });




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
