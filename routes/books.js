const express = require('express');
const router = express.Router();
const models  = require('../models');
const Op = models.Sequelize.Op;

// display all books at /books route
router.get('/', (req, res) => {
  const title = 'Books';
  models.Book.findAll().then(books => {
    res.render('index', {title, books});
  });
  
});

// handlers for /new route
router.route('/new')
  // display new-book form
  .get((req, res) => {
    const title = 'New Book';
    res.render('new-book', { title });
  })
  // save the new book to database and go back to index page
  .post((req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const year = req.body.year;

    models.Book.create({ title, author, genre, year })
      .then(book => {
        res.redirect('/books');
      })
      // handle validation error
      .catch(error => {
        if (error.name === 'SequelizeValidationError') {
          res.render('new-book', { title: 'New Book', errors: error.errors });
        } else {
          throw error; // if it's not a validation error send it to next catch
        }
      })
      .catch(error => {
        res.send(500);
      });
  });

// search for books in database using provided query
router.get('/search', (req, res) => {
  models.Book.findAll({
    where: {
      [Op.or]: [
        { 
          title: { [Op.like]: `%${req.query.query}%` }
        },
        { 
          author: { [Op.like]: `%${req.query.query}%` }
        },
        { 
          genre: { [Op.like]: `%${req.query.query}%` }
        },
        { 
          year: { [Op.like]: `%${req.query.query}%` }
        }
      ]
    }
  }).then(books => {
    // render search template
    res.render('index', {title: 'Search', books, search: true });
  }).catch(() => {
    res.send(500);
  });
});

router.route('/:id')
  // display a book details using provided book's id
  .get((req, res, next) => {
    models.Book.findById(req.params.id)
      .then(book => {
        if (book)
          res.render('update-book', {title: book.title, book})
        else
          // send error to global error handler if no books found by id
          next(new Error('Book not found!'));
      })
      .catch(error => {
        res.send(500);
      });
  })
  // update a book's details in the database and go back to index page
  .post((req, res) => {
    models.Book.findById(req.params.id)
      .then(book => {
        book.update(req.body)
          .then(() => {
            res.redirect('/books');
          });
      });
  });

// delete a book using provided id and go back to index page
router.post('/:id/delete', (req, res) => {
  models.Book.findById(req.params.id)
    .then(book => {
      book.destroy();
      res.redirect('/books');
    })
    .catch(error => {
      res.send(500);
    });
});

// global error handle for /books route
router.use((error, req, res, next) => {
  res.render('error', { title: 'Book Not Found' });
});

module.exports = router;