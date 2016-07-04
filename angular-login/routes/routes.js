'use strict';

var router = require('express').Router();
var jsugar = require('jsugar');
var session = require('express-session');
var crypto = require('crypto');

router.get('/', function(req, res) {
   res.render('index');
});

module.exports = router;
