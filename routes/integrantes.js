var express = require('express');
var router = express.Router({mergeParams: true});

var mongoose = require('mongoose');
var Familia = require('../models/Familia.js');

router.use(function(req, res, next) {
  Familia.findById(req.params.familia, function(err, familia) {
    if(err) return next(err);
    if(!familia) return res.sendStatus(404);
    req.familia = familia;
    next();
  });
});

router.get('/', function(req, res, next) {
  var familia = req.familia;
  res.json(familia.integrantes);
});

router.get('/:id', function(req, res, next) {
  var familia = req.familia;
  var integrante = familia.integrantes.id(req.params.id);
  res.json(integrante);
});

router.post('/', function(req, res, next) {
  var familia = req.familia;
  familia.integrantes.push(req.body);
  familia.save(function(err) {
    if(err) return next(err);
    res.json(familia);
  });
});

router.put('/:id', function(req, res, next) {
  var familia = req.familia;
  var integrante = familia.integrantes.id(req.params.id);
  integrante.nome = req.body.nome;
  integrante.papel = req.body.papel;
  familia.save(function(err, familia) {
    if(err) return next(err);
    res.json(familia);
  });
});

router.delete('/:id', function(req, res, next) {
  var familia = req.familia;
  familia.integrantes.id(req.params.id).remove();
  familia.save(function(err, familia) {
    if(err) return next(err);
    res.json(familia);
  });
});

module.exports = router;
