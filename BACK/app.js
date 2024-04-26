const express = require('express');
const app = express();
const connectDB = require('./utils/connectDB')

// MIDDLEWAR pour bloquer les autres ip, a mettre a la fin -->
// TODO : Ajouter condition si page stastique
// app.use((req, res, next) => {
//     const clientIp = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
//     if (clientIp === 'localhost' || clientIp === '127.0.0.1' || clientIp === '::1') {
//         next();
//     } else {
//         res.status(403).send('Access denied');
//     }
// });


app.use('/register', require('./routes/register/route'))

app.use('/login', require('./routes/login/route'))

app.use('/products', require('./routes/products/route'))

app.use('/commands', require('./routes/commands/route'))

// app.use('/details_commands', require('./routes/details_commands/route'))

app.get('/', async (req, res) => {
    res.send('API BACK')
    try {
        await connectDB()
        console.log('Connected')
    } catch (error) {
        console.log('Failed to connect to the database: ' + error)
    }
})

app.listen(5000, 'localhost', () => {
    console.log('Server is running on port 5000');
});