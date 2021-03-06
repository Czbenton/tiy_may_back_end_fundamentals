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
        defaultValue: "I'm just a person floating around the sun."
      }
    },
    {}
  );

  user.associate = function(models) {
    user.hasMany(models.post, { as: "posts", foreignKey: "authorid" });
    user.hasMany(models.comment, { as: "comments", foreignKey: "authorid" });
  };

  return user;
};
