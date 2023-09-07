const server = require('./src/app')
const { database } = require('./src/db')
const PORT = 3001;

// console.log(database.sync())// devuelve una promesa
// force: true =>  hace que la base de datos se caiga y vuelta al evantarse para crear las tablas.
database.sync({ force: true }).then( 
    () => server.listen(PORT, () => {
        console.log(`Server listen on port: ${PORT}`)
    })
)



