const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');

const connection = require('./database/database');

connection
  .authenticate()
  .then(() => console.log('Success connection on database!'))
  .catch((err) => console.log('Failed connection on database!'));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/ask', (req, res) => {
  res.render('ask');
});

app.post('/saveask', (req, res) => {
  const { title, description } = req.body;
  res.send(`Tilte: ${title}, description: ${description}`);
});

app.listen(PORT, () =>
  console.log(`Serve started in http://localhost:${PORT}`)
);
