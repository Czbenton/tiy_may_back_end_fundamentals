"use strict";
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define(
    "post",
    {
      msg_body: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Invalid message body. Try again."
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

  post.associate = function(models) {
    post.belongsTo(models.user, { as: "author", foreignKey: "authorId" });
    post.hasMany(models.like, { as: "likes", foreignKey: "postId" });
  };

  return post;
};
