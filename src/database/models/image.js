'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING,
    itemId: DataTypes.INTEGER,

  }, {});
  Image.associate = (models) => {
    Image.belongsTo(models.Item, {
      foreignKey: 'itemId',
      targetKey: 'id',
      as: 'item'
    });
  };
  return Image;
};
