const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// Configuration de la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database'
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) throw err;
    console.log('Connexion réussi');
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

app.get('/filtrer', (req, res) => {
    const categorie = req.query.categorie;
    let sql = 'SELECT * FROM produits';
    if (categorie) {
        sql += ` WHERE categorie = '${categorie}'`;
    }
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('accueil', { products: result, csrfToken: req.query.csrfToken }); // Affichage page d'accueil avec filtre produit
    });
});
