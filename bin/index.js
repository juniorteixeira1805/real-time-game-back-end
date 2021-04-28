const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // essa biblioteca serve para gerenciar quais outros dominios podem acessar minha API
const requireDir = require('require-dir')
require('dotenv/config')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080

//-- Iniciando o app
const app = express()
app.use(bodyParser.json()) // O body-parser é um módulo capaz de converter o body da requisição para vários formatos. Um desses formatos é json.
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors()) // Aqui pode ser configurado a segurança e os dominios perrmitidos

const path = require('path')
app.use(express.static(path.join(__dirname, '../public')))

//-- iniciando o DB
mongoose.connect(process.env.BD_TESTES, { useUnifiedTopology: true })

//--Importando models
    //- O require dir é uma biblioteca para importa pasta em um arquivo
requireDir('../src/Models')

//--Rotas
app.use('/', require('../src/Routes/routes'))

app.listen(PORT, ()=>console.log('API its working'))