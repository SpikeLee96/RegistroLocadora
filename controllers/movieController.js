var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get('/', (req, res) => {
    res.render("movie/index", {
        viewTitle: "Página Inicial"
    });
});

router.get('/addOrEdit', (req, res) => {
    res.render("movie/addOrEdit", {
        viewTitle: "Incluir Filme"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        inserir(req, res);
    else
        atualizar(req, res);
});


function inserir(req, res) {
    var movie = new Movie();
    movie.titulo = req.body.titulo;
    movie.anolancamento = req.body.anolancamento;
    movie.codbarra = req.body.codbarra;
    movie.diretor = req.body.diretor;
    movie.paislancamento = req.body.paislancamento;
    movie.duracao = req.body.duracao;
    movie.genero = req.body.genero;
    movie.save((err, doc) => {
        if (!err)
            res.redirect('/list');
        else {
            if (err) {
                console.log('Falha durante a inserção do filme: ' + err);

            }
        }
    });
}

function atualizar(req, res) {
    Movie.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { 
		res.redirect('/list'); 
	} else {
                console.log('Falha durante a modificação do filme : ' + err);
        }


    });
}


router.get('/list', (req, res) => {
    Movie.find((err, docs) => {
        if (!err) {
            res.render("movie/list", {
                list: docs
            });
        }
        else {
            console.log('Falha ao carregar a lista de filmes :' + err);
        }
    });
});


router.get('/:id', (req, res) => {
    Movie.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("movie/addOrEdit", {
                viewTitle: "Atualizar filme",
                movie: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else { console.log('Falha ao excluir filme :' + err); }
    });
});

module.exports = router;
