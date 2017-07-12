"use strict";
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define(
    "comment",
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );

  comment.associate = function(models) {
    comment.belongsTo(models.post, { as: "post", foreignKey: "postid" });
    comment.belongsTo(models.user, { as: "author", foreignKey: "authorid" });
  };

  return comment;
};
