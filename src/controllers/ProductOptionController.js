import ProductOptionRepository from "../repositories/ProductOptionRepository.js";

class ProductOptionController {

  //Método p/ listar
  async index(req, res) {
    try {
      const productOptions = await ProductOptionRepository.findAll();
      res.status(200).json(productOptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ obter pelo ID
  async show(req, res) {
    try {
      const productOption = await ProductOptionRepository.findById(req.params.id);
      if (!productOption) {
        return res.status(404).json({ error: "Não foi possível encontrar" });
      }
      res.status(200).json(productOption);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ criar
  async store(req, res) {
    try {
      const newProductOption = await ProductOptionRepository.create(req.body);
      res.status(200).json(newProductOption);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ atualizar
  async update(req, res) {
    try {
      const updated = await ProductOptionRepository.update(req.body, req.params.id);
      if (!updated) {
        return res.status(404).json({ error: "Não encontrado ou nenhuma alteração realizada" });
      }
      res.status(200).json({ message: "Atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ deletar
  async delete(req, res) {
    try {
      const deleted = await ProductOptionRepository.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Não foi possível encontrar" });
      }
      res.status(200).json({ message: "Deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new ProductOptionController();