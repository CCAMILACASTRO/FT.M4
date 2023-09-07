const { User } = require('../db') //importo el modelo

//Simulan una base de datos
//let users = []; ya creamos la base de datos.

//Esta funcion trae a todos los usuarios.
const getUsers = () => { 
    return users;
}

const getUsersByName = (name) => { //Busca si hay un nombres iguales dentro de la base de datos y retorna TODOS los que haya iguales.

    const usersFound = users.filter((user) => user.name === name)

    if(!usersFound.length) return { error: 'No existen usuarios con ese nombre'}
    return usersFound
}

const getUserById = (id) => {

    const idFound = users.find((user) => user.id === +id)

    if(!idFound) return { error: 'No existe un usuario con ese ID'}
    return idFound;
}


// let id = 1; ya no necesito id porque ya tengo base de datos
const postUser = async (name, lastname, email) => {
    
    const newUser = await User.create({ //creo un nuevo objeto con los datos del usuario dentro del modelo User.
            // id: id++,
            name,
            lastname,
            email,
            // post: [] ya uso las tablas de la base de datos.
        }
    ) 
    // users.push(newUser) ya no lo necesito porque ya tengo base de datos
    return newUser;
}

const updateUser = (id, name, lastname, email) =>{

   const user = getUserById(id) //ejecutamos la funcion que ya busca por id y agarramos ese usuario.

   if(user.error) return user;

   user.name = name || user.name;
   user.lastname = lastname || user.lastname;
   user.email = email || user.email;

   return user;
}


const deleteUser = (id) => {
    const user = getUserById(id);

    if(user.error) return user;
//Filtro y hago un nuevo array con todos aquellos usuarios cuyo ID sea distinto al que me mandaron
    users = users.filter((user) => user.id !== +id)

    return user;
}



module.exports = {
    getUsers,
    getUsersByName,
    getUserById,
    postUser,
    updateUser,
    deleteUser,
}