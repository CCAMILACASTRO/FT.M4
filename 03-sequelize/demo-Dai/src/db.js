require('dotenv').config()
const { Sequelize } = require('sequelize')
const userModel = require('./models/User')
const postModel = require('./models/Post')
const pageModel = require('./models/Page')
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}` , {
    logging: false
})

userModel(database);
postModel(database);
pageModel(database)

//RELACIONES ENTRE MODELOS/TABLAS:
const { User, Post, Page } = database.models;

//RELACION DE 1 A VARIOS Y VARIOS A 1
User.hasMany(Post); //Un usuario tiene muchos posteos (1 : N)
Post.belongsTo(User); // Un posteo puede tener sólo un usuario. (N : 1)

//RELACION DE VARIOS A VARIOS
User.belongsToMany(Page, { through: 'UserPage'}) //Un usuario puede tener varias paginas + tabla intermedia
Page.belongsToMany(User, { through: 'UserPage'})











module.exports = {
    database,
    ...database.models
}