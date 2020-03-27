const knex = require('knex');
const configurations = require('../../knexfile');

//Essa variavel é passada no package.json ao iniciar com npm test
const config = process.env.NODE_ENV == 'test' ? configurations.test : configurations.development;

//passando como parametro a conexão de desenvolvimento
const connection = knex(config);

module.exports = connection;