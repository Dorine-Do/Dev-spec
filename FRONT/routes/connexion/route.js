const express = require('express');
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.render('connexion', {cspNonce: req.nonce});
});

app.post('/', async (req, res) => {

    const { email, password } = req.body;

    const loginUser = async () => {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        return response.json();
    }

    const user = await loginUser();
    if (user.message === 'User logged in') {
        req.session.email = email;
        res.redirect('/');
    } else {
        res.send("Email ou mot de passe incorrect");
    }


});

module.exports = app;