const { DataTypes } = require('sequelize')

module.exports = (database) => {
    database.define('Posteo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: { //Esta seria la F.K que se conecta con la tabla de Users.
            type: DataTypes.INTEGER,
            allowNull: false,
            
        }
    })
}
