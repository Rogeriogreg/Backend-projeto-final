Product.associate = (models) => {
  Product.belongsToMany(models.Category, {
    through: 'ProductCategory',
    foreignKey: 'product_id',
    as: 'categories'
  });

  Product.hasMany(models.ProductImage, {
    foreignKey: 'product_id',
    as: 'images'
  });

  Product.hasMany(models.ProductOption, {
    foreignKey: 'product_id',
    as: 'options'
  });
};
