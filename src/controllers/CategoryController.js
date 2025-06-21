import CategoryRepository from "../repositories/CategoryRepository.js";

class CategoryController {
  //Método p/ listar todas as categorias
  async index(req, res) {
    try {
      //Obtém os parâmetros de consulta da requisição
      const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;
      //Convertendo a string 'fields' em um array de atributos
      const fieldsArray = fields.split(',');
      //Convertendo o parâmetro 'use_in_menu' p/ um valor booleano ou nulo
      const useInMenu = use_in_menu === 'true' ? true : null;
      //Chama o repositório p/ pegar as categorias
      const categories = await CategoryRepository.findAll(parseInt(limit), parseInt(page), fieldsArray, useInMenu);
      res.status(200).json({
        data: categories.rows || categories, //Objeto com os dados
        total: categories.count || categories.length, //Conta o total de categorias
        limit, //Limite de itens por página
        page, //Número da página atual
      });
    } catch (err) {
      // Trata erros, respondendo com status 500 (Internal Server Error)
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ pegar uma categoria pelo ID
  async show(req, res) {
    try {
      const category = await CategoryRepository.findById(req.params.id);  
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  //Método P/ criar uma nova categoria
  async store(req, res) {
    try {
      const { name, slug, use_in_menu } = req.body;
      if (!name || !slug || use_in_menu === undefined) {
        return res.status(400).json({ error: 'Dados inválidos' });
      }
      const newCategory = await CategoryRepository.create({ name, slug, use_in_menu });
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método P/ atualizar uma categoria
  async update(req, res) {
    try {
      //Obtendo os dados da requisição q serão atualizados
      const { name, slug, use_in_menu } = req.body;
      //Verificação p/ ve se tem algum dado a ser atualizado
      if (!name && !slug && use_in_menu === undefined) {
        return res.status(400).json({ error: 'Dados inválidos' });
      }
      const updated = await CategoryRepository.update({ name, slug, use_in_menu }, req.params.id);
      res.status(200).json({ message: "Categoria atualizada com sucesso" });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  //Método p/ deletar uma categoria
  async delete(req, res) {
    try {
      await CategoryRepository.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new CategoryController();