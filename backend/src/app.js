const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

//Permissão apenas para um dominio frontend
// app.use(cors({
//     origin: 'projetoaustin.com'
// }));

app.use(cors());
app.use(express.json());
app.use(routes);

//Faz os erros de servidor retornarem em Json
app.use(errors());

//separando dessa forma podemos pedir para o npm test vir para cá sem subir a aplicação no servidor
//e para o npm run dev executar a aplicação a partir do ./server e subir em servidor(3333)
module.exports = app;