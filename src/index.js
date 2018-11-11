const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
mongoose.set('debug', true);
mongoose.connect("mongodb://localhost:2702/tarefas-db", { useNewUrlParser: true })
    .then(function(){
        console.log("Banco de dados Conectado")
    })
    .catch(function(){
        console.error(err)
    });
// Configurações
app.set("port", 3000)

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Rotas
app.use("/api/tarefas",require("./routes/tarefas"));

// Arquivos estáticos
app.use(express.static(__dirname + "/public"));

// Servidor
app.listen(app.get("port"), function () {
    console.log("server on port", app.get("port"), "!!!"); 
});