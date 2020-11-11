"use strict";

var express = require('express');

var router = express.Router();

var Users = require('../model/Users');

router.get('/', function (req, res) {
  Users.find({}, function (err, data) {
    if (err) return res.send({
      error: 'Erro na consulta de usuários!'
    });
    return res.send(data);
  });
});
router.post('/create', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  if (!email || !password) return res.send({
    error: 'Dados insuficientes !'
  });
  Users.findOne({
    email: email
  }, function (err, data) {
    if (err) return res.send({
      error: 'Erro ao buscar usuário!'
    });
    if (data) return res.send({
      error: 'Usuário já registrado!'
    });
    Users.create(req.body, function (err, data) {
      if (err) return res.send({
        error: 'Erro ao cadastrar usuário'
      });
      data.password = undefined;
      return res.send(data);
    });
  });
});
router.post('/auth', function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;
  Users.findOne({
    email: email
  }, function (err, data) {
    if (err) return res.send({
      error: 'Erro ao conectar!'
    });
    if (data.password == password) return res.send(data);
    return res.send({
      error: 'Erro ao conectar!'
    });
  });
});
module.exports = router;