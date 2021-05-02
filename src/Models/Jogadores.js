const mongoose = require('mongoose')
// mongoose-paginate é utilizado para auxiliar na listagem dos models
const mongoosePaginate = require('mongoose-paginate')


const jogadorestSchema = new mongoose.Schema({
    dateCreater: {
        type: Date,
        default: Date.now
    },
    dateNoticia: {
        type: String,
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
    },
    images: [{
        link: {
            type: String,
        },
        authorImage: {
            type: String,
        }
    }],
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