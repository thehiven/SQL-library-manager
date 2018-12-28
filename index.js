const express = require('express');
const path = require('path');
const sequelize = require('./models/index').sequelize;
const books = require('./routes/books');

const app = express();
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

app.use('/static', express.static(path.join(__dirname, 'public')));

// redirect to /books route
app.get('/', (req, res) => {
  res.redirect('/books');
});

app.use('/books', books);

// show 404 error when no responding routes are found
app.use((req, res, next) => {
  res.status(404).render('page-not-found', { title: 'Page Not Found' });
});

// sync database and start listening to the port
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server is running on port 3000!'));
});