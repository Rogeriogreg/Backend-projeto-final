'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductOption = sequelize.define('ProductOption', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shape: {
      type: DataTypes.ENUM('square', 'circle'),
      defaultValue: 'square'
    },
    radius: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    type: {
      type: DataTypes.ENUM('text', 'color'),
      defaultValue: 'text'
    },
    values: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'product_options',
    timestamps: true,
    underscored: true
  });

  ProductOption.associate = (models) => {
    ProductOption.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return ProductOption;
};
