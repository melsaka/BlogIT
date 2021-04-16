const express           = require('express');
const cors              = require('cors');
const app               = express();

app.use(cors());

app.use(express.json());

require('./config')();

require('./connection')();

require('./Routes/Api')(app);

require('./App/Exceptions/Handler')(app);

app.listen(5000, () => {
    console.log('The server is up and running');
})