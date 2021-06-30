const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/:name/:lang', (req, res) => {
  var { name, lang } = req.params;

  var showMsg = true;

  var products = [
    {
      name: 'Notebook',
      price: 1199.99,
    },
    {
      name: 'Phone',
      price: 599.99,
    },
    {
      name: 'Koke',
      price: 3.99,
    },
  ];

  res.render('index', {
    name,
    lang,
    showMsg,
    products,
  });
});

app.listen(PORT, () =>
  console.log(`Serve started in http://localhost:${PORT}`)
);
