const express = require('express');
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.render('inscription', {cspNonce: req.nonce});
});

app.post('/', async (req, res) => {
    const { prenom, nom, email, phone, password, confirm_password, address } = req.body;
    if (password !== confirm_password) {
        res.send("Les mots de passe ne correspondent pas");
    } else {
        const fetchUser = async() => {
            const response = await fetch('http://localhost:5000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            return response.json();
        }

        const user = await fetchUser();
        const foundUsers = user.filter(user => user.email === email);
        if (foundUsers.length > 0) {
            if (email === foundUsers[0].email) {
                res.send("Email déjà utilisé");
            }
        } else {
            const hashedPassword = brcypt.hashSync(password, 10);
            const addUser = async () => {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ firstName: prenom, lastName: nom, email, phone, password: hashedPassword, address, isAdmin: 0 })
                });
                    
                return response.json();
            }

            await addUser();
            res.redirect('/connexion');
        }
    }
});

module.exports = app;