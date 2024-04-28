const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {
    res.render('addProduct', {cspNonce: req.nonce})
})

module.exports = app;