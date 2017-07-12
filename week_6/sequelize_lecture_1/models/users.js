"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:
          "I am so cool, I don't need a bio, cause you should already know about me."
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return users;
};
