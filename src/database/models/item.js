'use strict';

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    sellerId: DataTypes.INTEGER,
    price: DataTypes.RANGE(sequelize.INTEGER)
  }, {});
  Item.associate = (models) => {
    Item.belongsTo(models.User, {
      foreignKey: 'sellerId',
      targetKey: 'id',
      as: 'seller'
    });
  };
  return Item;
};
