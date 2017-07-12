"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.changeColumn("books", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "This books has no description"
    });
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.changeColumn("books", "description", {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};
