const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig);

const User = require("./User")(sequelize);
const Category = require("./Category")(sequelize);
const Product = require("./Product")(sequelize);
const ProductImage = require("./ProductImage")(sequelize);
const ProductOption = require("./ProductOption")(sequelize);
const ProductCategory = require("./ProductCategory")(sequelize);

// ASSOCIAÇÕES

Product.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(ProductOption, { foreignKey: "product_id" });
ProductOption.belongsTo(Product, { foreignKey: "product_id" });

Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
  otherKey: "category_id"
});

Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "category_id",
  otherKey: "product_id"
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Category,
  Product,
  ProductImage,
  ProductOption,
  ProductCategory,
};
