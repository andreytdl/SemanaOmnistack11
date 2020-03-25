const connectionDB = require('../database/connection');

module.exports = {
    async store(req, res){
        const { title, description, value } = req.body;
        //O codigo da ong se diz a respeito de que ong está autenticada
        const ong_id = req.headers.authorization;

        const [id] = await connectionDB('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json( { id } )
    },

    async index(req, res){
        const { page = 1 } = req.query; //busco a page, se ela não existir então será 1

        //Conta o total de incidentes cadastrados na tabela
        const [count] = await connectionDB('incidents').count();

        //Retorna o total de incidentes no header da resposta
        res.header('X-Total-Count', count['count(*)']);


        const incidents = await connectionDB('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5) //Pula essa quantidade de registro dependendo da pagina
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
            ]);


        return res.json(incidents);
    },

    async delete(req, res){
        const { id } = req.params; //aquele :id
        const ong_id = req.headers.authorization;

        const incident = await connectionDB('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            console.log(incident);
            console.log(incident.ong_id, ong_id);
            return res.status(401).json( { error: 'Operation not permitted' });
        }
        await connectionDB('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};