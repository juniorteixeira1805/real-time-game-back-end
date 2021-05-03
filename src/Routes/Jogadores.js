const express = require('express')
const routes = express.Router();

const JogadoresController = require('../Controllers/Jogadores/index')

//******* Rotas de listagem ***********/
routes.get('/jogadores', JogadoresController.index);
routes.get('/jogador/:id', JogadoresController.show);
//******* Rotas de edição ***********/
routes.put('/edit/:id', JogadoresController.update);
routes.put('/addimage/:id', JogadoresController.addImage);
//******* Rotas de criar ***********/
routes.post('/register', JogadoresController.store);
//******* Rotas de deletar ***********/
routes.delete('/destroy/:id', JogadoresController.destroy);

module.exports = routes;