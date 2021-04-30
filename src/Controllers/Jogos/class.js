const mongoose = require('mongoose')

const Jogos = mongoose.model('jogos')

class Jogo {

    constructor() {}

    cadastrarJogos = async function(body) {
        if(!body.adversary) return {error: 'adversary not informed!'}

        try {
            return await Jogos.create(body);
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarTodosJogos = async function() {
        try {
            return await Jogos.find().sort({date: 1})
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarUmjogo = async function(id) {
        if(!id) return {error: 'id not informed!'}

        try {
            const jogo = await Jogos.findById(id)
            if(!jogo) return {error: 'Game not found!'}
            return await jogo
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

    //Função que adiciona um evento ao Jogo
    adicionarEvento = async function(idJogo, evento) {
        if(!idJogo) return {error: 'id not informed!'}
        if(!evento) return {error: 'evento not informed!'}

        try {
            //Buscando o Model do jogo
            const jogo = await Jogos.findById(idJogo)
            if(!jogo) return {error: 'Game not found!'}
            //adicionando o evento ao array events do Model jogo
            await jogo.events.push(evento)
            //verificando se o evento foi um gol
            if(evento.event === "GOOOL"){
                //criando um objeto gol
                const gol = {
                    club: evento.club,
                    player: evento.player,
                    assistance: evento.assistance,
                    time: evento.time
                }
                //adicionando gol ao array gols do Model jogo
                await jogo.goals.push(gol)
            }
            if(evento.event === "Cartão"){
                //criando um objeto gol
                const card = {
                    color: evento.cardColor,
                    player: evento.player,
                    time: evento.time
                }
                //adicionando gol ao array gols do Model jogo
                await jogo.cards.push(card)
            }
            //Mudando o status do jogo dependendo do evento
            if(evento.event === "Inicio primeiro") editarJogos(idJogo, {status: "Primeiro"})
            if(evento.event === "Fim primeiro") editarJogos(idJogo, {status: "Intervalo"})
            if(evento.event === "Inicio segundo") editarJogos(idJogo, {status: "Segundo"})
            if(evento.event === "Fim segundo") editarJogos(idJogo, {status: "Jogo finalizado"})

            //Salvando o Model modificado
            await jogo.save();

            return jogo
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }
}

module.exports = Jogo;