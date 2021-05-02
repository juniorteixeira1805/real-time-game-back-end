const Noticia = require('./class')

module.exports = {
    async index(req, res){
        try {
            const News = new Noticia();
            return res.status(200).send(await News.buscarTodasNoticias());
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async show(req, res){
        try {
            const News = new Noticia();
            return res.status(200).send(await News.buscarUmaNoticia(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    // Rota que cadastra um novo Noticia
    async store(req, res){
        try {
            const News = new Noticia();
            return res.status(200).send(await News.cadastrarNoticia(req.body));
        } catch (error) {
            console.log(error)
            return res.status(400).send({erro: error});
        }
    },

    async update(req, res){
        try {
            const News = new Noticia();
            return res.status(200).send(await News.editarNoticia(req.params.id, req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async destroy(req, res){
        try {
            const News = new Noticia();
            return res.status(200).send(await News.deletarNoticia(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    // Função que é executado quando a rota add-evento é chamada { method: post }
    async addImage(req, res){
        try {
            const News = new Noticia();
            return res.status(200).send(await News.adicionarEvento(req.body.id, req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    }
}