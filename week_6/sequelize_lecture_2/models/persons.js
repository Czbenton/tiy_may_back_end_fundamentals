'use strict';
module.exports = function(sequelize, DataTypes) {
  var persons = sequelize.define('persons', {
    name: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    zip: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // point to other tables, by ref, "Foreign Key"
      }
    }
  });
  return persons;
};