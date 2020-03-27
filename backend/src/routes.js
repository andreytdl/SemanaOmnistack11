const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const { celebrate, Segments, Joi } = require('celebrate');

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


//Validaremos utilizando o celebrate
//Middleware -> o express executa as rotas da esquerda para a direita, 
//então podemos colocar quantos parâmetros quisermos
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        // no minimo 10 caracteres e no max 11 devido ao '9' antes de celulares
        whatsapp: Joi.string().required().min(10).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.store);



routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.store);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
       id: Joi.number().required(), 
    })
}), IncidentController.delete);



routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);



routes.post('/session', SessionController.store);


module.exports = routes;