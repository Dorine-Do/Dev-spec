const express = require('express');
const cors = require('cors');


const app = express();

const connectDB = require('./utils/connectDB')

const connection = connectDB()
.then(()=>{console.log('Connected')})
.catch((error)=>{console.log('Failed to connect to the database: ' + error)})


// middleware --------------------------------------------------------------------------------------------------------------------------
// CORS 
const corsOptions = {
    // origin: Configures the Access-Control-Allow-Origin 
    // methods: Configures the Access-Control-Allow-Methods
    origin: function (origin, callback) {
        if (origin === 'http://localhost:3000') {
        callback(null, true); // Autorise l'origine
        } else {
        callback(new Error('Not allowed by CORS')); // Rejette l'origine
        }
    },

    methods: ['POST', 'GET','PUT','DELETE']
  };

//--------------------------------------------------------------------------------------------------------------------------
app.use('/stats',cors({origin:'*'}), require('./routes/stats/route'))

app.use(cors(corsOptions), express.json());

app.post('/test', (req, res)=> {
    const { data } = req.body;
    res.send('Fetch fonctionel entre 3000 et 5000')
})


app.use('/register', require('./routes/register/route'))

app.use('/login', require('./routes/login/route'))

app.use('/products', require('./routes/products/route'))

app.use('/commands', require('./routes/commands/route'))

// app.use('/details_commands', require('./routes/details_commands/route'))


app.listen(5000, 'localhost', () => {
    console.log('Server is running on port 5000');
});