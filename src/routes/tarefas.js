const express = require("express");
const router = express.Router();



const Tarefa = require("../models/tarefa");

router.get("/", function(req, res,next){
    Tarefa.find()
        .then(function(doc){
            console.log(doc);
        });
});

module.exports = router;