import express from 'express'
import * as db from './db.js'
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Sistema iniciado em http://localhost:${port}`);
});

app.get('/users', async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
})