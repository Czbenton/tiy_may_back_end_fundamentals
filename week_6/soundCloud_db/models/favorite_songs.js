"use strict";
module.exports = function(sequelize, DataTypes) {
  var favorite_songs = sequelize.define(
    "favorite_songs",
    {
      artwork: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      artist: DataTypes.STRING,
      stream_url: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return favorite_songs;
};
