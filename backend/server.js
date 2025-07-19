const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// app.post('/save', (req, res) => {
//   const session = req.body;
//   fs.appendFileSync('backend/sessions.json', JSON.stringify(session) + '\n');
//   res.sendStatus(200);
// });
app.post('/save', (req, res) => {
    const session = req.body;
  
    const sessionsPath = path.join(__dirname, 'sessions.json');
    let sessions = {};
  
    if (fs.existsSync(sessionsPath)) {
      const content = fs.readFileSync(sessionsPath, 'utf-8').trim();
      if (content) {
        try {
          sessions = JSON.parse(content);
        } catch (err) {
          console.error('Failed to parse existing sessions.json:', err);
          sessions = {};
        }
      }
    }
  
    // Add new session with unique ID
    const sessionId = `session_${Object.keys(sessions).length + 1}`;
    sessions[sessionId] = session;
  
    fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
    res.sendStatus(200);
  });
  
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});