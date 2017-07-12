"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.changeColumn("favorite_songs", "description", {
      type: Sequelize.TEXT,
      allowFalse: true
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.changeColumn("favorite_songs", "description", {
      type: Sequelize.STRING
    });
  }
};
