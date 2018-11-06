const express = require("express");
const router = express.Router();



const Tarefa = require("../models/tarefa");

// Obter todas as tarefas do banco
router.get("/", function(req, res, next){
    Tarefa.find()
        .then(function(doc){
            res.json(doc);
        });
});
// Adicionar tarefas no banco
router.post("/", function(req, res, next){
    const tarefa = new Tarefa(req.body);
    tarefa.save();
    res.json({
        status:"Tarefa armazenada"
    });
});

// Atualizar tarefas
router.put("/:id", function(req, res, next){
    Tarefa.findOneAndUpdate(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
        }
        res.json({
            status:"Tarefa atualizada"
        });
    });
});

// Deletar tarefa
router.delete("/:id", function(req, res, next){
    Tarefa.findOneAndDelete(req.params.id, function(err, result){
        if(err){
            console.log(err);
        };
        res.json({
            status:"Tarefa removida"
        });
    });
})

module.exports = router;