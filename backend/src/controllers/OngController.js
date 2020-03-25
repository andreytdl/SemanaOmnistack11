const connectionDB = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async store(req, res){
        const { name, email, whatsapp, city, uf }= req.body;

        //irá gerar 4 bytes de um hexadecimal aleatorio que utilizaremos para ser o id da ong
        const id = crypto.randomBytes(4).toString('HEX');

        await connectionDB('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        
        return res.json({ id });


    },

    async index(req, res){

        const ongs = await connectionDB('ongs').select('*');
        return res.json(ongs);
    }
}