const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const morgan = require('morgan');
const router = require('./routers/index');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/products', rescue(router.productsRouter));

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;