const request = require('supertest');
const app = require('../../src/app');
const connectionDB = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach( async () => {
        //Para não duplicar tabela
        await connectionDB.migrate.rollback();
        //Pode ser feita a mesma migration para bancos diferentes
        await connectionDB.migrate.latest();
    })

    it('should be able to create a new ong', async () => {
        const response =  await request(app)
        .post('/ongs')
        .set('Authorization', '4133546e')
        .send({
            name: "Campinas",
            email: "contato@cps.com.br",
            whatsapp: "11964656746",
            city: "São Paulo",
            uf: "SP"
        });
        
        console.log(response.body);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
    
    afterAll(async () => {
        await connectionDB.destroy();
    })
});