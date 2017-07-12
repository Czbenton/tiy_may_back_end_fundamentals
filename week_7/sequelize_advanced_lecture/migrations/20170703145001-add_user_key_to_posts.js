"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn("posts", "authorId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn("posts", "authorID");
  }
};
