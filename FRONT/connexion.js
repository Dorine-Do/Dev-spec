const mysql = require('mysql');

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


// Ajoutez une nouvelle route pour la connexion
app.post('/connexion', (req, res) => {
    const { email, password } = req.body;
    // Vérifiez si l'utilisateur existe dans la base de données
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            // Utilisateur trouvé, générer un token CSRF (simulé)
            const csrfToken = Math.random().toString(36).substring(2); // Génération aléatoire de token CSRF
            // Rediriger l'utilisateur vers la page d'accueil avec le token CSRF
            res.redirect(`/accueil?csrfToken=${csrfToken}`);
        } else {
            // Utilisateur non trouvé, afficher un message d'erreur
            res.send("Email ou mot de passe incorrect");
        }
    });
});
