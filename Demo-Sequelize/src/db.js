require('dotenv').config()
const { Sequelize } = require('sequelize'); //traemos a Sequelize
const UserModel = require('./models/UserModel')
const PosteoModel = require('./models/PosteoModel')

//const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const database = new Sequelize(`postgres://postgres:1234ccc@localhost:5432/demosequelize`, {
    logging: false
}) //Instanciamos sequelize

UserModel(database) // Ejecuto la funcion del modelo de UserModel y le paso database por parametro. Lo recibe el module.exports del archivo UserModels.js
PosteoModel(database)

console.log(database.models)

module.exports = {
    database, //exporto la instancia de sequelize
    ...database.models //exporto los modelos que cree dentro de la instancia de sequelize.
}
