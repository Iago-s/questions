const Sequelize = require('sequelize');
const connection = new Sequelize('guiaanswers', 'root', '2307', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
