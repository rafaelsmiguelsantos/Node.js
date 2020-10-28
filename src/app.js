const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const id = uuid()
  const {title, url, techs} = request.body
  const newRepo = {
    id,
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(newRepo)
  return response.status(200).json(newRepo)
});

app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params
  
  const {title, url, techs} = request.body

  const index = repositories.findIndex(value=> value.id === id)
  
  if( index ===-1)  return response.status(400).json({error:'Ops Algo deu errado...'})

  if(index>=0){
    const update = {
      id,
      title, 
      url,
      techs,
      likes:repositories[index].likes
    }

    repositories[index] = update

    return response.status(200).json(update)
  }else{
    return response.status(400).json({error:'Ops Algo deu errado...'})
  }
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const index = repositories.findIndex(value=> value.id === id)

  if(index===-1) return response.status(400).json({error:'Ops Algo deu errado...'})

  repositories.splice(index,1)
  
  return response.status(204).json({message:'Deletado com Sucesso'})
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}= request.params
  const index = repositories.findIndex(value=> value.id === id)

  if(index===-1) return response.status(400).json({error:'pOps Algo deu errado...'})

  repositories[index].likes +=1;

  return response.json(repositories[index])
});

module.exports = app;
