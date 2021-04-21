const express = require('express')
const routes = express.Router();

const JogosController = require('../Controller/Jogos/index')

routes.get('/jogoss', JogosController.index);
routes.get('/jogos/:id', JogosController.show);
routes.put('/jogos-update/:id', JogosController.update);
routes.post('/jogos-register', JogosController.store);
routes.delete('/jogos-destroy/:id', JogosController.destroy);

module.exports = routes;