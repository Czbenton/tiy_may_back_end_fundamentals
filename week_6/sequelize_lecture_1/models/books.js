"use strict";
module.exports = function(sequelize, DataTypes) {
  var books = sequelize.define(
    "books",
    {
      title: DataTypes.STRING,
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "This books has no description"
      },
      author: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return books;
};
