const mongoose = require('mongoose')

const Noticias = mongoose.model('noticias')

class Noticia {

    constructor() {}

    cadastrarNoticia = async function(body) {
        if(!body.author) return {error: 'author not informed!'}
        if(!body.title) return {error: 'title not informed!'}

        try {
            return await Noticias.create(body);
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarTodasNoticias = async function() {
        try {
            return await Noticias.find().sort({dateCreater: -1})
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    buscarUmaNoticia = async function(id) {
        if(!id) return {error: 'id not informed!'}

        try {
            const Noticia = await Noticias.findById(id)
            if(!Noticia) return {error: 'News not found!'}
            return Noticia
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    editarNoticia = async function(id, body) {
        if(!id) return {error: 'id not informed!'}
        if(!body) return {error: 'body not informed!'}
        
        try {
            return await Noticias.findByIdAndUpdate(id, body, {new: true});
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    deletarNoticia = async function(id) {
        if(!id) return {error: 'id not informed!'}
        if(!( await Noticias.findById(id))) return {error: 'News not found!'}

        try {
            
            await Noticias.findByIdAndRemove(id);
            return {success: "successfully deleted"}
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }

    //Função que adiciona um evento ao Noticia
    adicionarImage = async function(idNoticia, image) {
        if(!idNoticia) return {error: 'id not informed!'}
        console.log(image)
        if(!image.link) return {error: 'link not informed!'}
        if(!image.authorImage) return {error: 'author not informed!'}

        try {
            //Buscando o Model do Noticia
            const Noticia = await Noticias.findById(idNoticia)
            if(!Noticia) return {error: 'News not found!'}
            //adicionando o evento ao array events do Model Noticia
            await Noticia.images.push(image)
            
            //Salvando o Model modificado
            await Noticia.save();

            return Noticia
        } catch (error) {
            return {error: 'an error has occurred!'}
        }
    }
}

module.exports = Noticia;