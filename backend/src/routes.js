const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();


/* 
    Rotas / Recursos

*/

/**
 * Tipos de parâmetros
 * 
 * Query: Passados no GET "?" (/users?nome=andrey) Parametro (filtros, paginação)
 * Route: /users/:id - 
 * Request Body: enviado no Post em formato JSON
 * 
 */

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.store);


module.exports = routes;