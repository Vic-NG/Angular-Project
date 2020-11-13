const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors')
const url = config.bd_string;
const options = {poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados!', + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Desconectado com o banco de dados!');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada com sucesso!')
});

//BODY PARSER
app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());
app.use(cors());


const indexRoute = require('./Routes/index');
const userRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', userRoute)

app.listen(3000);

module.exports = app;

//string de conexão mongodb+srv://username_admin:<23011770Vi>@clusterapi.4cmme.mongodb.net/<dbname>?retryWrites=true&w=majority