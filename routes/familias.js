var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Familia = require('../models/Familia.js');
var integrantes = require('./integrantes.js')

router.get('/', function(req, res, next) {
    Familia.find({'user': req.user._id}, function(err, familia) {
        if(err) return next(err);
        res.json(familia);
    });
});

router.get('/:id', function(req, res, next) {
    Familia.findById(req.params.id, function(err, familia) {
        if(err) return next(err);
        res.json(familia);
    });
});

router.post('/', function(req, res, next) {
    var familia = new Familia(req.body);
    familia.user = req.user._id;
    Familia.create(familia, function(err, familia) {
        if(err) return next(err);
        res.json(familia);
    });
});

router.put('/:id', function(req, res, next) {
    Familia.findByIdAndUpdate(req.params.id, req.body, function(err, familia) {
        if(err) return next(err);
        res.json(familia);
    });
});

router.delete('/:id', function(req, res, next) {
    Familia.findByIdAndRemove(req.params.id, req.body, function(err, familia) {
        if(err) return next(err);
        res.json(familia);
    });
});

router.use('/:familia/integrantes', integrantes);

module.exports = router;