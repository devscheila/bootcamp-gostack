const express = require('express');

const server = express();

server.get('/teste', (req, res) => {
  //return res.send('Hello World');
  return res.json({ message: 'Hello World' });
})

// Query params = ?nome=Scheila
// Route params = /users/1
// Request body = { "name": "Scheila", "email": "devscheila@gmail.com" }

server.get('/users', (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
})

/* 
server.get('/users/:id', (req, res) => {
  // const id = req.params.id; -- ou usando desestruturação
  const { id } = req.params; 

  return res.json({ message: `Buscando o usuário ${id}` });
})
*/

// CRUD - Create, Read, Update, Delete

const users = ['Scheila', 'Noah', 'Maya', 'Barto'];

// Buscando usuário do array
server.get('/users/:index', (req, res) => {
  const { index } = req.params; 

  return res.json(users[index]);
})



server.listen(3000);