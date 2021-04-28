const mongoose = require('mongoose')
// mongoose-paginate é utilizado para auxiliar na listagem dos models
const mongoosePaginate = require('mongoose-paginate')


const JogostSchema = new mongoose.Schema({
    dateCreater: {
        type: Date,
        default: Date.now
    },
    dateGamer: {
        type: Date,
    },
    bestOfTheMan: {
        type: String,
        default: "Quem será o Best of the man?"
    },
    adversary:{
        name: {
            type: String,
        },
        avatar: {
            type: String,
            default: "avatar"
        }
    },
    local: {
        type: String,
    },
    typo : {
        type: String,
        default: "Amistoso"
    },
    status: {
        type: String,
        default: "Jogo marcado"
    },
    events: [{
        event: {
            type: String,
            required: true
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
        club: {
            type: String,
            required: true,
        },
        player: {
            type: String,
            required: true 
        },
        assistance: {
            type: String,
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

// Definido o pluglin para poder utilizar a função paginate
JogostSchema.plugin(mongoosePaginate)

mongoose.model('jogos', JogostSchema)