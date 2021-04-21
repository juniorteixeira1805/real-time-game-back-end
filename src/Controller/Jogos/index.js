const Jogo = require('./class')

module.exports = {
    async index(req, res){
        try {
            const jogos = new Jogo();
            return res.status(200).send(await jogos.buscarTodosJogos(req.query));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async show(req, res){
        try {
            const jogos = new Jogo();
            return res.status(200).send(await jogos.buscarUmJogos(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async store(req, res){
        try {
            const jogos = new Jogo();
            return res.status(200).send(await jogos.cadastrarJogos(req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async update(req, res){
        try {
            const jogos = new Jogo();
            return res.status(200).send(await jogos.editarJogos(req.params.id, req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async destroy(req, res){
        try {
            const jogos = new Jogo();
            return res.status(200).send(await jogos.DeletarJogos(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    }
}