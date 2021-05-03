const express = require('express')
const routes = express.Router();

const JogosController = require('../Controllers/Jogos/index')

//******* Rotas de listagem ***********/
routes.get('/jogos', JogosController.index);
routes.get('/jogo/:id', JogosController.show);
//******* Rotas de edição ***********/
routes.put('/edit/:id', JogosController.update);
routes.put('/addevent/:id', JogosController.addEvent);
routes.put('/addescalacao/:id', JogosController.adicionarEscalacao);
//******* Rotas de criar ***********/
routes.post('/register', JogosController.store);
//******* Rotas de deletar ***********/
routes.delete('/destroy/:id', JogosController.destroy);

module.exports = routes;