"use strict";
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define(
    "post",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );

  post.associate = function(models) {
    post.belongsTo(models.user, { as: "author", foreignKey: "authorId" });
    post.hasMany(models.comment, { as: "comments", foreignKey: "postId" });
  };

  return post;
};
