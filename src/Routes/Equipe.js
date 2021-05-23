const express = require('express')
const routes = express.Router();

const EquipeController = require('../Controllers/Equipe/index')

routes.get('/dados', EquipeController.getInfo);

module.exports = routes;