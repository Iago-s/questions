const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');

const connection = require('./database/database');
const Ask = require('./database/models/Ask');
const Answer = require('./database/models/Answer');

connection
  .authenticate()
  .then(() => console.log('Success connection on database!'))
  .catch((err) => console.log('Failed connection on database!'));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Ask.findAll({
    raw: true,
    order: [['id', 'DESC']],
  }).then((asks) => {
    res.render('index', { asks });
  });
});

app.get('/ask', (req, res) => {
  res.render('ask');
});

app.post('/saveask', (req, res) => {
  const { title, description } = req.body;

  Ask.create({
    title,
    description,
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {});
});

app.get('/question/:id', (req, res) => {
  const { id } = req.params;

  Ask.findOne({
    where: { id },
  }).then((ask) => {
    if (ask != undefined) {
      Answer.findAll({
        where: { ask_id: id },
        order: [['id', 'DESC']],
      }).then((answers) => {
        res.render('question', { ask, answers });
      });
    } else {
      res.redirect('/');
    }
  });
});

app.post('/answer', (req, res) => {
  const { body, ask_id } = req.body;

  Answer.create({
    body,
    ask_id,
  }).then(() => {
    res.redirect(`/question/${ask_id}`);
  });
});

app.listen(PORT, () =>
  console.log(`Serve started in http://localhost:${PORT}`)
);
