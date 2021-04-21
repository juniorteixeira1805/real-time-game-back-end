const mongoose = require('mongoose')

const Jogos = mongoose.model('jogos')

class Jogo {

    constructor() {}

    cadastrarJogos = async function(body) {
        if(!body.title) return {error: 'title not informed!'}
        if(!body.description) return {error: 'description not informed!'}
        if(!body.url) return {error: 'url not informed!'}
        
        try {
            return await Jogos.create(body);
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarTodosJogos = async function(query) {
        if(!query) return {error: 'an error has occurred!'}
        const { page = 1 } = query // Está sendo recebido da query, o parametro de pagina que o usuario está na url
        try {
            return await Jogos.paginate({},{ page: page, limit: 10})
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarUmjogos = async function(id) {
        if(!id) return {error: 'id not informed!'}

        try {
            return await Jogos.findById(id)
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    editarJogos = async function(id, body) {
        if(!id) return {error: 'id not informed!'}
        if(!body) return {error: 'body not informed!'}
        
        try {
            return await Jogos.findByIdAndUpdate(id, body, {new: true});
        } catch (error) {
            console.error(error)
            return {error: 'an error has occurred!'}
        }
    }

    DeletarJogos = async function(id) {
        if(!id) return {error: 'id not informed!'}
        
        try {
            await Jogos.findByIdAndRemove(id);
            return {success: "successfully deleted"}
        } catch (error) {
            console.error(error)
            return {error: 'an error has occurred!'}
        }
    }
}

module.exports = Jogo;