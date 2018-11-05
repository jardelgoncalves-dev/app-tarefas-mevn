const express = require("express");
const app = express();

// Configurações
app.set("port", 3000)

// Middlewares

// Rotas

// Arquivos estáticos
app.use(express.static(__dirname + "/public"));

// Servidor
app.listen(app.get("port"), function () {
    console.log("server on port", app.get("port"), "!!!"); 
});