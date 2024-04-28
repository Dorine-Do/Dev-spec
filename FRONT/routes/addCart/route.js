const  LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const express = require('express');
const app = express();

app.use(express.json())

app.post('/', async (req, res) => {

    const cartId = req.body.cartId;

    console.log(cartId)

    if(localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', JSON.stringify([cartId]));
    } else {
        const cart = JSON.parse(localStorage.getItem('cart'));
        cart.push(cartId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    console.log(localStorage.getItem('cart'));

    res.render('cart', {cspNonce: req.nonce, cart: localStorage.getItem('cart')})
})

module.exports = app;