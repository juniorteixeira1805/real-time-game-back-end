const Equipe = require('./class')

module.exports = {
    async getInfo(req, res){
        try {
            const equipe = new Equipe();
            return res.status(200).send(await equipe.getDados());
        } catch (error) {
            return res.status(400).send({erro: error});
        }
    },
}