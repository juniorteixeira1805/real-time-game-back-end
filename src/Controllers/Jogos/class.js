const mongoose = require('mongoose')

const Jogos = mongoose.model('jogos')
const Jogadores = mongoose.model('jogadores')

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
            return await Jogos.find().sort({date: -1})
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
                    player: await this.adicionarGol(evento.player),
                    assistance: await evento.assistance ? await this.adicionarAssistencia(evento.assistance) : 'Indefinido',
                    time: evento.time
                }
                //adicionando gol ao array gols do Model jogo
                await jogo.goals.push(gol)
            }
            if(evento.event === "Cartão"){
                //adicionando cartao vermelho ao jogador
                if(evento.cardColor === "Vermelho"){
                    //criando um objeto gol
                    const card = {
                        color: evento.cardColor,
                        player: await this.adicionarCartaoVermelho(evento.player),
                        time: evento.time
                    }
                    //adicionando cartao ao array cartao do Model jogo
                    await jogo.cards.push(card)
                }

                //adicionando cartao amarelo ao jogador
                if(evento.cardColor === "Amarelo"){
                    //criando um objeto gol
                    const card = {
                        color: evento.cardColor,
                        player: await this.adicionarCartaoAmarelo(evento.player),
                        time: evento.time
                    }
                    //adicionando cartao ao array cartao do Model jogo
                    await jogo.cards.push(card)
                } 
            }

            //Salvando o Model modificado
            await jogo.save();

            return jogo
        } catch (error) {
            console.log(error)
            return {error: 'an error has occurred!'}
        }
    }

    adicionarEscalacao = async function (idJogo, idJogador) {
        if(!idJogo) return {error: 'id gamer not informed!'}
        if(!idJogador) return {error: 'id player not informed!'}

        try {
            const jogador = await Jogadores.findById(idJogador.idJogador)
            if(!jogador) return {error: 'player not found!'}
            jogador.dados.jogos = await jogador.dados.jogos + 1
            await jogador.save();

            const escalacao = {
                idJogador: idJogador.idJogador,
                name: jogador.nome,
                posicao: jogador.posicao,
                avatar: jogador.avatar
            }
            
            const jogo = await Jogos.findById(idJogo)
            if(!jogo) return {error: 'gamer not found!'}
            await jogo.escalacao.push(escalacao)
            await jogo.save();
            return {success: "successfully add"}
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    adicionarGol = async function (idJogador) {
        if(!idJogador) return {error: 'id player not informed!'}

        try {
            const jogador = await Jogadores.findById(idJogador)
            if(!jogador) return {error: 'player not found!'}
            jogador.dados.gols = jogador.dados.gols + 1
            await jogador.save();

            return jogador.nome
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    adicionarAssistencia = async function (idJogador) {
        if(!idJogador) return {error: 'id player not informed!'}

        try {
            const jogador = await Jogadores.findById(idJogador)
            if(!jogador) return {error: 'player not found!'}
            jogador.dados.assistencias = jogador.dados.assistencias + 1
            await jogador.save();

            return jogador.nome
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    adicionarCartaoAmarelo = async function (idJogador) {
        if(!idJogador) return {error: 'id player not informed!'}

        try {
            const jogador = await Jogadores.findById(idJogador)
            if(!jogador) return {error: 'player not found!'}
            jogador.dados.cartaoAmarelo = jogador.dados.cartaoAmarelo + 1
            await jogador.save();

            return jogador.nome
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    adicionarCartaoVermelho = async function(idJogador) {
        if(!idJogador) return {error: 'id player not informed!'}

        try {
            const jogador = await Jogadores.findById(idJogador)
            if(!jogador) return {error: 'player not found!'}
            jogador.dados.cartaoVermelho = jogador.dados.cartaoVermelho + 1
            await jogador.save();

            return jogador.nome
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }
}

module.exports = Jogo;