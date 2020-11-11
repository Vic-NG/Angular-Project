"use strict";

var express = require('express');

var app = express();

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var indexRoute = require('./Routes/index');

var userRoute = require('./Routes/users');

var url = "mongodb+srv://username_admin:23011770Vi@clusterapi.4cmme.mongodb.net/clusterapi?retryWrites=true&w=majority";
var options = {
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', function (err) {
  console.log('Erro na conexão com o banco de dados!', +err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Desconectado com o banco de dados!');
});
mongoose.connection.on('connected', function () {
  console.log('Aplicação conectada com sucesso!');
}); //BODY PARSER

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use('/', indexRoute);
app.use('/users', userRoute);
app.listen(3000);
module.exports = app; //string de conexão mongodb+srv://username_admin:<23011770Vi>@clusterapi.4cmme.mongodb.net/<dbname>?retryWrites=true&w=majority