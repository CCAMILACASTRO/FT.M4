const { DataTypes } = require('sequelize')

//CREAR MODELOS/TABLAS:
// Metodo .define => 1er: nombre del modelo / 2do: atributos dentro de un objeto

module.exports = (database) => {
    database.define('User', {
        id: {
            type: DataTypes.INTEGER, //numero entero
            autoIncrement: true, //autoincrementable
            primaryKey: true, //indicamos que es la primary key
        },
        name: {
            type: DataTypes.STRING, //string o varchar
            allowNull: false, // no puede venir vacio.
        },
        lastname: { //demo dai usa username
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // indica que no puede estar repetido.
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // indica que no puede estar repetido.
        }
    },
    {
        timestamps: false,
    })
}
