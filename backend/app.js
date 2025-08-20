const express = require("express") // importando o express
const cors = require("cors") // importando o cors
const app = express() // invocando express na variável


app.use(cors()) // a aplicação está usando cors, app.use(cors())

app.use(express.json()) // usado para permitir a comunicação de dados via json

// listen é um método responsável por iniciar o servidor express

// o listen diz para o node.js escutar requisições http em uma porta específica
app.listen(3000, function() {
    console.log("O Servidor está online ^-^")
})





