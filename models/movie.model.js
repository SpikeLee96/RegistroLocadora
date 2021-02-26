var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: 'Este campo é obrigatório.'
    },
    anolancamento: {
        type: Number
    },
    codbarra: {
        type: Number,
        required: 'Este campo é obrigatório.'
    },
    diretor: {
        type: String
    },
    paislancamento: {
        type: String
    },
    duracao: {
        type: String
    },
    genero: {
        type: String,
        required: 'Este campo é obrigatório.'
    }
});


mongoose.model('Movie', movieSchema);