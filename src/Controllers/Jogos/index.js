const Jogo = require('./class')

module.exports = {
    async index(req, res){
        try {
            const jogo = new Jogo();
            return res.status(200).send(await jogo.buscarTodosJogos());
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async show(req, res){
        try {
            const jogo = new Jogo();
            return res.status(200).send(await jogo.buscarUmJogos(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    // Rota que cadastra um novo jogo
    async store(req, res){
        try {
            const jogo = new Jogo();
            return res.status(200).send(await jogo.cadastrarJogos(req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async update(req, res){
        try {
            const jogo = new Jogo();
            return res.status(200).send(await jogo.editarJogos(req.params.id, req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async destroy(req, res){
        try {
            const jogo = new Jogo();
            return res.status(200).send(await jogo.DeletarJogos(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    // Função que é executado quando a rota add-evento é chamada { method: post }
    async addEvent(req, res){
        try {
            const jogo = new Jogo();
            return res.status(200).send(await jogo.adicionarEvento(req.body.id, req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    }
}