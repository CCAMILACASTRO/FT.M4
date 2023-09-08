const express = require('express')
const morgan = require('morgan')
const { User } = require('./db')

const server = express();

//Middlewars
server.use(express.json()); //para transformar/parsear de JSON a JS, la info que viene de req.body y usarlo en el servidor.
server.use(morgan('dev')); //formato para ver en la consola la info que viene del servidor

//Creamos usuarios
server.post('/user', async (req, res) => {
    try {
        const { name, lastname, birthday } = req.body;
        
        const newUser = await User.create({
            name, lastname, birthday
        })

        res.status(200).json(newUser)//Si todo salio bien le mandamos la info del usuario creado.

    } catch (error) {
        res.status(404).send(error.message)
    }
})

//Obtenemos los usuarios: TODOS O POR NOMBRE
server.get('/user', async (req, res) => {
    try {
        const { name } = req.query;

        if(!name) { //Si no me mandan el nombre por query devuelve todos los usuarios.
            //const allUsers = await User.findAll();
            const allUsers = await User.findAll({
                attributes: ['name', 'lastname'] //Puedo elegir con que propuedades quiero que me mande el usuario.
            });

            res.status(200).json(allUsers)
        }
        else {
            const usersByName = await User.findAll({ //Busco los nombres que conincidan con ese nombre que me pasan por query
                where: {
                    name
                }
            })
            res.status(200).json(usersByName)
        }        
    } catch (error) {
        res.status(404).send(error.message)
    }
})


//Buscamos por usuario y sino lo creamos:
server.post('/user/find', async (req, res) => {
    try {
        const { name, lastname, birthday } = req.body;

        const user = await User.findOrCreate({
            where: { name }, //busca coincidencia por nombre
            defaults: { //Si coincide le indico las otras propiedades que quiero incluirle
                lastname,
                birthday
            }
        })
        res.status(200).json(user)        
    } catch (error) {
        res.status(404).send(error.message)
    }
})



//Eliminamos usuarios:
server.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const userDeleted = await User.findByPk(id); //busca un usuario por su Primary Key.
        
        userDeleted.destroy(); //Elimina el registro de la base de datos;

        res.status(200).json(userDeleted);

    } catch (error) {
        res.status(404).send(error.message)
    }
})

//Traemos usuario por ID:
server.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const userById = await User.findByPk(id);

        if(!userById) throw Error('El usuario no existe') //Verifica si el usuario existe
        
        res.status(200).json(userById)
    } catch (error) {
        res.status(404).send(error.message);        
    }
})





module.exports = server;