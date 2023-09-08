const server = require('./src/app')
const PORT = 3001;
const { database } = require('./src/db')



database.sync({ alter: true }).then( () => {
        console.log('Database connected')
        server.listen(PORT, () => {
            console.log(`Server on port:  ${PORT}`)
        })
})

