'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    nama: DataTypes.STRING
  }, {});
  author.associate = function(models) {
    // associations can be defined here
    author.hasMany(models.book, {foreignKey:'authorId'});
  };
  return author;
};