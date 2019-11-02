const express = require('express');

const server = express();

server.use(express.json());

server.get('/teste', (req, res) => {
  //return res.send('Hello World');
  return res.json({ message: 'Hello World' });
})

// Query params = ?nome=Scheila
// Route params = /users/1
// Request body = { "name": "Scheila", "email": "devscheila@gmail.com" }

/*
server.get('/users', (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
})

server.get('/users/:id', (req, res) => {
  // const id = req.params.id; -- ou usando desestruturação
  const { id } = req.params; 

  return res.json({ message: `Buscando o usuário ${id}` });
})
*/

// CRUD - Create, Read, Update, Delete

const users = ['Scheila', 'Noah', 'Maya', 'Barto'];

// Middleware global de log
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
})

// Middleware local - Verifica se o nome do usuário existe
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

// Middleware local - Verifica se o index do usuário existe
function checkUserInArray(req, res, next) {
  const user = users[req.params.index]
  
  if (!user) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  req.user = user;

  return next();
}

// Buscando todos os usuários do array
server.get('/users', (req, res) => {
  return res.json(users);
})

// Buscando um usuário do array
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
})

// Criar um usuário
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

// Editar um usuário
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

// Deletar um usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
})

server.listen(3000);