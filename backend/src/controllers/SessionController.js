const connectionDB = require('../database/connection');

module.exports = {

    async index(req, res){

    },

    async store(req, res){
        const { id } = req.body;

        const ong = await connectionDB('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong) {
            return res.status(400).json({ error: 'No ong found with this ID' });
        }

        return res.json(ong);
    }

}