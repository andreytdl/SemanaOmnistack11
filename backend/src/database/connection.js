const knex = require('knex');
const configurations = require('../../knexfile');

//passando como parametro a conexão de desenvolvimento
const connection = knex(configurations.development);

module.exports = connection;