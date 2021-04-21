const mongoose = require('mongoose')
// mongoose-paginate é utilizado para auxiliar na listagem dos models
const mongoosePaginate = require('mongoose-paginate')


const ProductSchema = new mongoose.Schema({
    dateCreater: {
        type: Date,
        default: Date.now
    },
    dateGamer: {
        type: Date,
    },
    adversary:{
        type: String,
        required: true
    },
    events: [{
        event: {
            type: String,
            required: true
        },
        player: {
            type: String,
            required: true 
        }
        time: {
            type: String,
            required: true 
        }
    }],
    goals: [{
        club: {
            type: String,
            required: true,
            unique: true
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
    CreatedAt :{
        type: Date,
        default: Date.now
    }
})

// Definido o pluglin para poder utilizar a função paginate
ProductSchema.plugin(mongoosePaginate)

mongoose.model('product', ProductSchema)