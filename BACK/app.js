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

const registerRoute = require('./routes/register/route')
const loginRoute = require('./routes/login/route')

app.use('/register', registerRoute)

app.use('/login', loginRoute)

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