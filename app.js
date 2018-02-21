var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETED');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content_type, Accept');
  next();
});



mongoose.connect('mongodb://localhost/exampledb');

mongoose.connection.on('error', function () {
  console.log('error..............');
});

mongoose.connection.once('open', function () {
  console.log('We are conected to mongodb ;)');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

var usersRoute = require('./routes/users.route');
var articlesRoute = require('./routes/articles.route');

app.get('/', function (request, response) {
  response.send('hello world');
});

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);

app.listen(3000, function () {
  console.log('corriendo en el puerto 3000');
});