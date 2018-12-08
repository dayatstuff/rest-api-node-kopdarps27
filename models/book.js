'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    judul: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    penerbit: DataTypes.STRING,
    tanggal_terbit: DataTypes.DATE
  }, {});
  book.associate = function(models) {
    // associations can be defined here
    book.belongsTo(models.author,{foreignKey:'authorId'});
  };
  return book;
};