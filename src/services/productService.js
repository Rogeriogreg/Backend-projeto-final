const { Product, ProductImage, ProductOption, Category, ProductCategory } = require("../models");

async function createProduct(productData) {
  const { category_ids, images, options, ...product } = productData;

  const createdProduct = await Product.create(product, { include: [ProductImage, ProductOption] });

  if (category_ids?.length) {
    await createdProduct.setCategories(category_ids);
  }

  if (images?.length) {
    for (const img of images) {
      await ProductImage.create({ path: img.content, product_id: createdProduct.id });
    }
  }

  if (options?.length) {
    for (const opt of options) {
      await ProductOption.create({ ...opt, values: opt.values.join(","), product_id: createdProduct.id });
    }
  }

  return createdProduct;
}

async function getProductById(id) {
  const product = await Product.findByPk(id, {
    include: [
      { model: Category, through: { attributes: [] } },
      { model: ProductImage },
      { model: ProductOption },
    ],
  });

  if (!product) return null;

  const result = product.toJSON();
  result.options = result.ProductOptions?.map((opt) => ({
    ...opt,
    values: opt.values.split(",")
  }));

  return result;
}

async function updateProduct(id, updateData) {
  const product = await Product.findByPk(id);
  if (!product) return null;

  await product.update(updateData);
  return product;
}

async function deleteProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) return null;

  await product.destroy();
  return true;
}

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
