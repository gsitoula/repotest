'use strict';
var express = require('express');
var path = require('path');
var morgan = require('morgan');
//var sugar = require('node-sugarcrm-client');
var jsugar = require('jsugar');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(express.static(path.join(__dirname, 'public')));

var domain = "http://localhost/SugarCE-Full-6.5.23/service/v4_1/rest.php";

var username = "admin";
var password = "admin";


  jsugar.login(domain, username, password, function(err, res) {
      var id = res.data.id;

      // Retrieve the number of Accounts
      var params = {
        session: id,
        module_name: 'Accounts',
        query: '',
        deleted: false
      };
      jsugar.call(domain, 'get_entries_count', params, function(error, response) {
        // the server returns:
        // response = { data: { result_count: '561' } }
        console.log(response);
        app.post('/postAlgo', function(req, res) {
           res.send(response);
        });
      });

      // Close the session:
      jsugar.logout(domain, id);
});

// jsugar.getServerInfo(domain, function(error, res) {
//    console.log(res);
// });






var port = 3000;

app.listen(port, function() {
    console.log("funcionando en el puerto: " + port);
});


// sugar.init(
//   {
//     apiURL: "http://localhost/SugarCE-Full-6.5.23/service/v4_1/rest.php",
//     login: "admin",
//     passwd: "admin"
//   }
// );

// console.log(sugar.configInfo());
//
// app.get('/', function(req, res) {
//     res.render('index');
// });
//
// app.post('/postLogin', function(req, res) {
//
//     sugar.login(function(sessionID){
//         if(sessionID != 'undefined') {
//             //add your query here
//             var s_name = req.body.name;
//             var s_value = req.body.value;
//             var params = {
//                                  session:  sessionID,
//                                  module_name : "Accounts",
//                                  name_value_list : [
//                                                     { "name":  "namess",  "value": "Account from Node-SugarCRM-Client" }
//                                                     ]
//                              };
//                     sugar.call("set_entry", params, function(res,err){
//                         if(err) {
//                           console.dir(err);
//                          }  //else {
//                         //   console.dir(res);
//                         // }
//                     });
//
//
//       } else {
//         console.log("check your privileges");
//       }
//     });
// });
