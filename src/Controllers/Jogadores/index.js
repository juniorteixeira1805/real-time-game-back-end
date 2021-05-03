const Jogadores = require('./class')

module.exports = {
    async index(req, res){
        try {
            const jogador = new Jogadores();
            return res.status(200).send(await jogador.buscarTodosJogadores());
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async show(req, res){
        try {
            const jogador = new Jogadores();
            return res.status(200).send(await jogador.buscarUmJogador(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    // Rota que cadastra um novo Jogadores
    async store(req, res){
        try {
            const jogador = new Jogadores();
            return res.status(200).send(await jogador.cadastrarJogador(req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async update(req, res){
        try {
            const jogador = new Jogadores();
            return res.status(200).send(await jogador.editarJogador(req.params.id, req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    async destroy(req, res){
        try {
            const jogador = new Jogadores();
            return res.status(200).send(await jogador.deletarJogador(req.params.id));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },

    // Função que é executado quando a rota add-evento é chamada { method: post }
    async addImage(req, res){
        try {
            const jogador = new Jogadores();
            return res.status(200).send(await jogador.adicionarImage(req.params.id, req.body));
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    }
}