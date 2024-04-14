const express = require('express');
const consign = require('consign');
const cors = require('cors');
const bodyParser = require('body-parser');

const Tabelas = require('./config/Tabelas');

Tabelas.init();
Tabelas.seed();

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Use o body-parser para lidar com dados em JSON

consign().include('controllers').into(app);

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));

app.get('/', (request, response) => {
    response.send('Servidor on-line!');
});