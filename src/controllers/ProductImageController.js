import ProductImageRepository from "../repositories/ProductImageRepository.js";

class ProductImageController {

  //Método p/ listar 
  async index(req, res) {
    try {
      const productsImages = await ProductImageRepository.findAll();
      res.status(200).json(productsImages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ obter pelo ID
  async show(req, res) {
    try {
      const productImage = await ProductImageRepository.findById(req.params.id);
      if (!productImage) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json(productImage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ criar
  async store(req, res) {
    try {
      const newProductImage = await ProductImageRepository.create(req.body);
      res.status(201).json(newProductImage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ atualizar
  async update(req, res) {
    try {
      const updated = await ProductImageRepository.update(req.body, req.params.id);
      if (!updated) {
        return res.status(404).json({ error: "Produto não encontrado ou nenhuma alteração realizada" });
      }
      res.status(200).json({ message: "Produto atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ deletar
  async delete(req, res) {
    try {
      const deleted = await ProductImageRepository.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new ProductImageController();