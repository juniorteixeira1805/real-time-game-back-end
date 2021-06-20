const mongoose = require('mongoose')

const Jogos = mongoose.model('jogos')
const Jogadores = mongoose.model('jogadores')

class Equipe {

    constructor() {}

    getDados = async function() {
        try {
            const jogadores = await Jogadores.find()
            const jogos = await Jogos.find()

            const totalJogos = await this.quantJogos(jogos)
            const { golsSofridos, golsMarcados } = this.quantGols(jogos)
            const { vermelho, amarelo } = this.quantCartoes(jogos)
            const { artilheiros, assistencias } = await this.artilhariaAssistencias(jogadores)

            const golsSofridosPorJogo = (golsSofridos/totalJogos).toFixed(2)
            const golsFeitosPorJogo = (golsMarcados/totalJogos).toFixed(2)
            const cartaoAmareloPorJogo = (amarelo/totalJogos).toFixed(2)
            const cartaoVermelhoPorJogo = (vermelho/totalJogos).toFixed(2)

            const dados = {
                jogos: totalJogos,
                cartoesAmarelos: amarelo,
                cartaoAmareloPorJogo: cartaoAmareloPorJogo,
                cartoesVermelhos: vermelho,
                cartoesVermelhosPorJogo: cartaoVermelhoPorJogo,
                golsSofridos: golsSofridos,
                golsSofridosPorJogo: golsSofridosPorJogo,
                golsMarcados: golsMarcados,
                golsFeitosPorJogo: golsFeitosPorJogo,
                artilheiros: artilheiros,
                assistencias: assistencias,
            }

            return dados
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    quantJogos = async function(jogos) {
        try {
            const jogosFinalizados = jogos.filter((objeto) => objeto.status === "Jogo finalizado")
            return parseInt(jogosFinalizados.length)
        } catch (error) {
            return {}
        }
    }

    quantGols = function(jogos) {
        try {
            var gols = []
            jogos.map((obj) => {
                obj.goals.map((objeto) => gols.push(objeto))
            })
            
            const golsSofridos = gols.filter((objeto) => objeto.club !== 'Guerreiros')
            const golsMarcados = gols.filter((objeto) => objeto.club === 'Guerreiros')

            return { golsSofridos: golsSofridos.length, golsMarcados: golsMarcados.length}
        } catch (error) {
            console.log(error)
            return {}
        }
    }

    quantCartoes = function(jogos) {
        try {
            var cartoes = []
            jogos.map((obj) => {
                obj.goals.map((objeto) => cartoes.push(objeto))
            })

            const vermelho = cartoes.filter((objeto) => objeto.color === 'Vermelho')
            const amarelo = cartoes.filter((objeto) => objeto.color === 'Amarelo')

            return { vermelho: vermelho.length, amarelo: amarelo.length}
        } catch (error) {
            return {}
        }
    }

    artilhariaAssistencias = async function(jogadores) {
        try {
            const artilheiros = jogadores.filter((obj) => obj.dados.gols > 0 )
            const assistencias = jogadores.filter((obj) => obj.dados.assistencias > 0 )

            artilheiros.sort(function (a, b) {
                if (a.dados.gols > b.dados.gols) {
                  return -1;
                }
                if (a.dados.gols < b.dados.gols) {
                  return 1;
                }
                return 0;
              });

              assistencias.sort(function (a, b) {
                if (a.dados.assistencias > b.dados.assistencias) {
                  return -1;
                }
                if (a.dados.assistencias < b.dados.assistencias) {
                  return 1;
                }
                return 0;
              });
    
            return { artilheiros: artilheiros, assistencias: assistencias}
        } catch (error) {
            return {}
        }
    }
}

module.exports = Equipe;