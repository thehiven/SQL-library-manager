'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: { msg: 'Title cannot be empty!' } // custom validation message
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: { msg: 'Author cannot be empty!' } // custom validation message
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};