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

// Buscando todos os usuários do array
server.get('/users', (req, res) => {
  return res.json(users);
})

// Buscando um usuário do array
server.get('/users/:index', (req, res) => {
  const { index } = req.params; 

  return res.json(users[index]);
})

// Criar um usuário
server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

// Editar um usuário
server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

// Deletar um usuário
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
})


server.listen(3000);