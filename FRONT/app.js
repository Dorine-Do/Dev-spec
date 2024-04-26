const express = require('express');
// const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.listen(3000, 'localhost', () => {
    console.log('Server is running on port 3000');
});


//MIDDLEWARE TOKEN CSRF
const csrf = require ('csurf');
const cookieparser = require('cookie-parser');

app.use(cookieparser());
app.use(csrf({cookie: true}));

app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// route CSRF TOKEN
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

