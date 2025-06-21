const productService = require("../services/productService");

async function createProductHandler(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function getProductByIdHandler(req, res) {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });

  return res.status(200).json(product);
}

async function updateProductHandler(req, res) {
  const { id } = req.params;
  try {
    const updated = await productService.updateProduct(id, req.body);
    if (!updated) return res.status(404).json({ message: "Produto não encontrado" });

    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function deleteProductHandler(req, res) {
  const { id } = req.params;
  const deleted = await productService.deleteProduct(id);
  if (!deleted) return res.status(404).json({ message: "Produto não encontrado" });

  return res.status(204).end();
}

module.exports = {
  createProductHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
};
