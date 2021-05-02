const express = require('express')
const routes = express.Router();

const NoticiasController = require('../Controllers/Noticias/index')

//******* Rotas de listagem ***********/
routes.get('/noticias', NoticiasController.index);
routes.get('/noticia/:id', NoticiasController.show);
//******* Rotas de edição ***********/
routes.put('/edit/:id', NoticiasController.update);
routes.put('/addimage/:id', NoticiasController.addImage);
//******* Rotas de criar ***********/
routes.post('/register', NoticiasController.store);
//******* Rotas de deletar ***********/
routes.delete('/destroy/:id', NoticiasController.destroy);

module.exports = routes;