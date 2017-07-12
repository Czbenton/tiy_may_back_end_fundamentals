"use strict";
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  comment.associate = function(models) {
    comment.belongsTo(models.post, { as: "post", foreignKey: "postId" });
    comment.belongsTo(models.user, { as: "author", foreignKey: "authorId" });
  };
  return comment;
};
