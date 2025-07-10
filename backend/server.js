const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/save', (req, res) => {
  const session = req.body;
  fs.appendFileSync('backend/sessions.json', JSON.stringify(session) + '\n');
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);