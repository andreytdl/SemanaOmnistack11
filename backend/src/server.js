const app = require('./app');

//separando dessa forma podemos pedir para o npm run dev vir para cá
//e para o npm test executar a aplicação a partir do ./app e não subir em servidor algum
app.listen(3333);