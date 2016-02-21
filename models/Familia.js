var mongoose = require('mongoose');

var IntegranteSchema = new mongoose.Schema({
    nome: {type: String},
    papel: {type: String, require: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var FamiliaSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    integrantes: [IntegranteSchema]
});

module.exports = mongoose.model('Familia', FamiliaSchema);