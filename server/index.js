const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const gridUtils = require('./grid');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);

app.post('/api/grid', (req, res) => {
  const grid = req.body.grid || [];
  const newGrid = gridUtils.caculateNewGrid(grid);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ grid: newGrid }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
