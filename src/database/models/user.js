'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('seller', 'buyer', 'admin'),
  }, {});
  User.associate = (models)=> {
    // associations can be defined here
  };
  return User;
};