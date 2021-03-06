const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//Connect to database
mongoose.createConnection(config.database, {
  useMongoClient: true
});
//On connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database' +config.database);
});
//
mongoose.connection.on('error', (err) => {
	console.log('Database error' +err);
});

const app = express();

const users = require('./routes/users');

//Port number
const port = 4000;

//Cors Middleware
app.use(cors());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

//Users route
app.use('/users', users);


//Index Route
app.get('/', (req, res) => {
	res.send('Invald Endpoit');
});

//Start Server
app.listen(port, () => {
	console.log( 'Server started on port ' +port);
});