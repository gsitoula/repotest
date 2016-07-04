'use strict';

var express = require('express');
var http = require('http');
var morgan = require('morgan');
var session = require('express-session');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var jsugar = require('jsugar');
var config = require('config');

var app = express();

var routes = require('./routes/routes.js');

app.use(morgan('dev'));
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));

//Set Views and engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {
    maxAge: 90000
  },
  secret: '123456',
  resave: false,
  saveUnitialized: true
}));

//Routes
app.use('/', routes);

var port = process.env.PORT || config.port || 3000;

app.listen(port, function() {
  console.log('Ejecutando en el puerto ' + port);
});
