const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

//Permissão apenas para um dominio frontend
// app.use(cors({
//     origin: 'projetoaustin.com'
// }));

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);