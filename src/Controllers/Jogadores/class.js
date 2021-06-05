const mongoose = require('mongoose')

const Jogadores = mongoose.model('jogadores')

class Jogador {

    constructor() {}

    cadastrarJogador = async function(body) {
        if(!body.nome) return {error: 'name not informed!'}

        try {
            return await Jogadores.create(body);
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarTodosJogadores = async function() {
        try {
            return await Jogadores.find().sort({ posicao: -1 })
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarUmJogador = async function(id) {
        if(!id) return {error: 'id not informed!'}

        try {
            const jogador = await Jogadores.findById(id)
            if(!jogador) return {error: 'News not found!'}
            return jogador
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    editarJogador = async function(id, body) {
        if(!id) return {error: 'id not informed!'}
        if(!body) return {error: 'body not informed!'}
        
        try {
            return await Jogadores.findByIdAndUpdate(id, body, {new: true});
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    deletarJogador = async function(id) {
        if(!id) return {error: 'id not informed!'}
        if(!( await Jogadores.findById(id))) return {error: 'News not found!'}

        try {
            
            await Jogadores.findByIdAndRemove(id);
            return {success: "successfully deleted"}
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

}

module.exports = Jogador;