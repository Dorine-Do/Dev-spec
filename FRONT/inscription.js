const bodyParser = require('body-parser');
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

// Utiliser body-parser pour récupérer les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour l'inscription
app.post('/inscription', (req, res) => {
    const { prenom, nom, email, phone, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        res.send("Les mots de passe ne correspondent pas");
    } else {
        // Insérer les données dans la base de données
        const user = { prenom, nom, email, phone, password };
        connection.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) throw err;
            console.log('Utilisateur inséré avec succès');
            res.send('Inscription réussie !');
        });
    }
});