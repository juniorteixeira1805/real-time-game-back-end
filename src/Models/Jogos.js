const mongoose = require('mongoose')
// mongoose-paginate é utilizado para auxiliar na listagem dos models
const mongoosePaginate = require('mongoose-paginate')


const JogostSchema = new mongoose.Schema({
    dateCreater: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
    },
    date: {
        type: Date,
    },
    dateGamer: {
        type: String,
    },
    hourGame: {
        type: String,
    },
    bestOfTheMan: {
        type: String,
        default: "Indefinido"
    },
    local: {
        type: String,
    },
    tipo : {
        type: String,
        default: "Amistoso"
    },
    status: {
        type: String,
        default: "Marcado"
    },
    streamer: {
        type: String,
        default: "Inativo"
    },
    adversary:{
        name: {
            type: String,
            required: true 
        },
        avatar: {
            type: String,
            default: "https://guerreiros.herokuapp.com/logoClubs/logoGenerica.png"
        }
    },
    escalacao: [{
        idJogador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jogadores',
        },
        name: {
            type: String,
        },
        posicao: {
            type: String,
        },
        avatar: {
            type: String,
        }
    }],
    events: [{
        event: {
            type: String,
        },
        description: {
            type: String,
        },
        player: {
            type: String,
        },
        assistance: {
            type: String,
        },
        club: {
            type: String,
        },
        time: {
            type: String,
            required: true 
        },
        cardColor: {
            type: String,
        },
    }],
    goals: [{
        assistance: {
            type: String,
        },
        club: {
            type: String,
            required: true,
        },
        player: {
            type: String,
            required: true 
        },
        time: {
            type: String,
            required: true 
        },
    }],
    cards: [{
        color: {
            type: String,
            required: true,
        },
        club: {
            type: String,
            required: true,
        },
        player: {
            type: String,
            required: true 
        },
        time: {
            type: String,
            required: true 
        }
    }],
})

formatarData = async function(date) {
    let data = new Date(date)
    let dia = data.getDate()
    if(dia<10) dia = `0${dia}`
    let mes = parseInt(data.getMonth()) + 1
    if(mes<10) mes = `0${mes}`
    let ano = data.getFullYear()

    return `${dia}/${mes}/${ano}`
}

formatarHora = async function(date) {
    dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado")
    let data = new Date(date)
    let hora = data.getHours()
    if(hora<10) hora = `0${hora}`
    let minutos = data.getMinutes()
    if(minutos<10) minutos = `0${minutos}`
    let dia = data.getDay()

    return `${dayName[dia]}, ${hora}:${minutos}`
}

JogostSchema.pre('save', async function(next){
    this.dateGamer = await formatarData(this.date)
    this.hourGame = await formatarHora(this.date)
})

// Definido o pluglin para poder utilizar a função paginate
JogostSchema.plugin(mongoosePaginate)

mongoose.model('jogos', JogostSchema)