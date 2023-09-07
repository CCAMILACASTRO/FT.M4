const express = require('express')
const usersRouter = express.Router()
const {getUsers, getUsersByName, getUserById, postUser, updateUser, deleteUser} = require('../controllers/controllers')

/* USERS:
- Ruta GET --> para que traiga a todos los usuarios y sino que busque por nombre(opcional, QUERY)
- Ruta GET /:id --> para que traiga el usuario con el ID correspondiente por medio de PARAMS.
- Ruta POST --> para crear un nuevo usuario.
- Ruta PUT --> modificar el usuario correspondiente.
- Ruta DELETE /:id --> recibe un ID por PARAMS para eliminar al usuario correspondiente.*/

/*******************************************************************************************************************/

// 1- Ruta GET --> para que traiga a todos los usuarios y sino que busque por nombre(opcional, QUERY)

usersRouter.get('/', (request, response) => {
    try {
        const { name } = request.query

        if(!name)  return response.status(200).json(getUsers())
        
        //ejecuta el controlador con el nombre
        const users = getUsersByName(name)

        //verifica si hay algun error en el objeto de usuarios porque no encontro un nombre.
        if(users.error) throw Error(users.error);
        return response.status(200).json(users); //Si no hay error envia los usuarios que corresponde a ese nombre.        
        
    } catch (error) {
        return response.status(404).send(error.message)         
    }
})

// 2- RutaGET /:id --> para que traiga el usuario con el ID correspondiente por medio de PARAMS.

usersRouter.get('/:id', (request, response) => {
    try {
        const { id } = request.params;

        //ejecuta el controlador con el id.
        const user = getUserById(id)

        //verifica si hay algun error en el objeto de usuarios porque no encontro un ID.
        if(user.error) throw Error(user.error)
        return response.status(200).json(user) //Si no hay error envia el usuario que corresponde a esa ID.
        
    } catch (error) {
        return response.status(404).send(error.message) 
    }
})

// 3- Ruta POST --> para crear un nuevo usuario.
// se hace en esa ruta porque voy a querer crear un usuario lo hago en users.

usersRouter.post('/', async (request, response) => {
    try {
        const { name, lastname, email} = request.body

        if(!name || !lastname || !email) throw Error('Faltan datos obligatorias')

        const newUser = await postUser(name, lastname, email)
        return response.status(200).json(newUser)
        
    } catch (error) {
        return response.status(404).send(error.message)
        
    }
})

// 4- Ruta PUT --> modificar el usuario correspondiente.

usersRouter.put('/', (request, response) => {
    try {
        const { id, name, lastname, email } = request.body;
//Si no me mandan ID nose a quien tengo que editar
        if(!id) throw Error('El ID es obligatorio')

        const user = updateUser(id, name, lastname, email)

        if(user.error) throw Error(user.error)
        return response.status(200).json(user)
        
        
    } catch (error) {
        return response.status(404).send(error.message)
    }
})


// 5- Ruta DELETE /:id --> recibe un ID por PARAMS para eliminar al usuario correspondiente.

usersRouter.delete('/:id', (request, response) => {
    try {
        const { id } = request.params;
        const delUser = deleteUser(id)

        if(delUser.error) throw Error(delUser.error)
        return response.status(200).json(delUser)
        
    } catch (error) {
        return response.status(404).send(error.message)
        
    }
})



module.exports = usersRouter;