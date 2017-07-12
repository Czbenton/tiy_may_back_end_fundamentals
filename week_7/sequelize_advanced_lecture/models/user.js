"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "insert default bio here"
      }
    },
    {}
  );

  user.associate = function(models) {
    user.hasMany(models.post, { as: "posts", foreignKey: "authorId" });
    user.hasMany(models.comment, { as: "comments", foreignKey: "authorId" });
  };

  return user;
};
