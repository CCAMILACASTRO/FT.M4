const express = require('express');
const morgan = require('morgan')
const server = express();
const usersRouter = require('./routes/usersRoutes');
const posteosRouter = require('./routes/posteosRoutes');


server.use(express.json()); // Parsea la info que viene en formato JSON y la pasa a JS
server.use(morgan('dev'));


server.use('/users', usersRouter);

server.use('/posteos', posteosRouter);


//Creamos una ruta para verificar que funcione correctamente.
server.get('/', (request, response) => {
    response.send('Holi')

})


module.exports = server;