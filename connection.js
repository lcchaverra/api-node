const {mysql_database, mongodb} = require('./config')
const mysql = require('mysql')
const mongoose = require('mongoose')

const connection = mysql.createConnection(mysql_database)
connection.connect((err, conn)=>{
        if (err){
            console.log('no se ha podido establecer la conexion a la base de datos SQL')
        }
        else {
            console.log('conexion a la base de datos SQL exitosa')
            return conn
        }
    }
)

connection.query(`use ${mysql_database.db}`, (err, result)=>{
    if (err){
        console.log(`no se ha podido establecer la base de datos ${mysql_database.db}`)
    }
    else {
        console.log(`conexion a la base de datos ${mysql_database.db} exitosa`)
    }
})

const mongoConnection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.db}`)
.then(()=>{
    console.log("Conexion exitosa a la bd de mongo:", mongodb.db)
})
.catch((err) =>{
    console.log("Ha ocurrido un error en la conexion de mongo:", err )
})

module.exports = {connection, mongoConnection}