<template>
    <div class="container" style="margin-top:100px;">
        <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="sendTarefa">
                            <div class="form-group">
                                <input type="text" v-model="tarefa.titulo" placeholder="Insira a tarefa" class="form-control">
                            </div>
                            <div class="form-group">
                                <textarea cols="30" rows="10" v-model="tarefa.descricao" class="form-control" placeholder="Insira uma descrição"></textarea>
                            </div>

                            <button v-if="edit === false" class="btn btn-danger btn-block"> Enviar </button>
                            <button v-else-if="edit === true" class="btn btn-primary btn-block"> Atualizar </button>

                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Tarefa</th>
                            <th scope="col">Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tarefa of tarefas" :key="tarefa._id" >
                            <td>{{tarefa.titulo}}</td>
                            <td>{{tarefa.descricao}}</td>
                            <td>
                                <button class="btn btn-danger" @click="deleteTarefa(tarefa._id)">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button class="btn btn-warning" @click="editTarefa(tarefa._id)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
class Tarefa {
    constructor (titulo, descricao){
        this.titulo = titulo;
        this.descricao = descricao;
    }

}

export default {
    data(){
        return {
            tarefa: new Tarefa(),
            tarefas: [],
            edit: false,
            idTarefaEditar:''
        }
    },
    created(){
        this.getTarefas();
    },
    methods:{
        sendTarefa() {
            if (this.edit === false){
                fetch("/api/tarefas", {
                    method:"POST",
                    body:JSON.stringify(this.tarefa),
                    headers:{
                        "Accept":"application/json",
                        "Content-type":"application/json"
                    }
                })
                .then(function (res) {
                    return res.json()
                })
                .then(function(data){
                    this.getTarefas()
                }.bind(this))
            }else{
                fetch("/api/tarefas/" + this.idTarefaEditar, {
                    method:"PUT",
                    body: JSON.stringify(this.tarefa),
                    headers:{
                        "Accept":"application/json",
                        "Content-type":"application/json"
                    }
                })
                .then(function (res) {
                    return res.json()
                })
                .then(function(data){
                    this.getTarefas();
                    this.edit = false;
                }.bind(this))
            }

            this.tarefa = new Tarefa()
        },

        getTarefas(){
            fetch("/api/tarefas")
            .then( function(res){
                return res.json();
            })
            .then( function(data){
                this.tarefas = data;
            }.bind(this))
        },
        deleteTarefa(id){
            fetch("/api/tarefas/" + id, {
                method: "DELETE",
                headers:{
                    "Accept":"application/json",
                    "Content-type":"application/json"
                }
            })
            .then( function(res){
                return res.json()
            })
            .then (function(data){
                this.getTarefas();
            }.bind(this))
             
        },
        editTarefa(id){
            fetch("/api/tarefas/" + id)
            .then( function(res){
                return res.json()
            })
            .then (function(data){
                this.idTarefaEditar = data._id
                this.tarefa = new Tarefa(data.titulo, data.descricao);
                this.edit = true;
            }.bind(this))
        }
    }
}
</script>

