const mongoose = require('mongoose')
// mongoose-paginate é utilizado para auxiliar na listagem dos models
const mongoosePaginate = require('mongoose-paginate')


const jogadorestSchema = new mongoose.Schema({
    dateCreater: {
        type: Date,
        default: Date.now
    },
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: String,
    },
    posicao: {
        type: String,
    },
    caracteristica: {
        type: String,
    },
    endereco : {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://guerreiros.herokuapp.com/jogadores/default.png"
    },
    ativo: {
        type: Boolean,
        default: true
    },
    dados: {
        jogos: {
            type: Number,
            default: 0
        },
        gols: {
            type: Number,
            default: 0
        },
        assistencias: {
            type: Number,
            default: 0
        },
        cartaoAmarelo: {
            type: Number,
            default: 0
        },
        cartaoVermelho: {
            type: Number,
            default: 0
        }
    }
})

formatarData = async function(dateCreater) {
    let data = new Date(dateCreater)
    let dia = data.getDate()
    if(dia<10) dia = `0${dia}`
    let mes = parseInt(data.getMonth()) + 1
    if(mes<10) mes = `0${mes}`
    let ano = data.getFullYear()

    return `${dia}/${mes}/${ano}`
}

jogadorestSchema.pre('save', async function(next){
    try {
        this.dateNoticia = await formatarData(this.dateCreater)
    } catch (error) {
        console.log(error)
    }
})

// Definido o pluglin para poder utilizar a função paginate
jogadorestSchema.plugin(mongoosePaginate)

mongoose.model('jogadores', jogadorestSchema)