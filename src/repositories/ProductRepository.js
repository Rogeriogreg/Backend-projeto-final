import Product from '../models/Product.js';
import User from '../models/User.js';
import { Op } from 'sequelize';


class ProductRepository {

  //Função auxiliar p/ simplificar o tratamento de erros
  async handleRequest(promise, errorMsg) {
    try {
      return await promise;
    } catch (err) {
      console.error("Erro na manipulação da solicitação", err);
      throw new Error(errorMsg);
    }
  }

  /*Listando todos os produtos
  async findAll() {
    return this.handleRequest(Product.findAll(), "Não foi possível localizar os Produtos!");
  }*/
  
    async findAll({limitParam, pageParam, fieldsParam, matchParam}, {
      limit = 12, // Definido como 12 por padrão
      page = 1,
      fields = ['name', 'price', 'slug', 'description'],
      match = null,
      category_ids = [],
      price_range = null,
      option = {},
    } = {}) {
    
      const query = {};
    
      console.log("campos=" + fieldsParam);
    
      if (limitParam > 0 || limitParam != null) {
        limit = limitParam;
      }
    
      if (pageParam > 0 && pageParam != null) {
        page = pageParam;
      }
    
      if (fieldsParam.length > 0 && fieldsParam != null) {
        fields = fieldsParam;
      }
    
      // Verifica se limit é -1, então não aplica paginação
      if (limit === -1) {
        const result = await this.handleRequest(Product.findAll({
          attributes: fields, // Seleciona os campos que devem ser retornados
          where: query, // Aplica os filtros de consulta
        }), "Não foi possível localizar os produtos");
    
        // Adiciona o ID ao resultado se não estiver presente
        result.forEach(product => {
          product.id = product.id;
        });
    
        return {
          count: result.length,
          rows: result
        };
      }
    
      // Validação do limit e da página
      if (isNaN(limit) || limit <= 0) {
        throw new Error('Valor inválido para limit');
      }
      if (isNaN(page) || page <= 0) {
        throw new Error('Valor inválido para page');
      }
    
      // Aplica o filtro 'match'
      if (matchParam) {
        query[Op.or] = [
          { name: { [Op.like]: `%${matchParam}%` } },
          { description: { [Op.like]: `%${matchParam}%` } }
        ];
      }
    
      // Aplica o filtro 'category_ids'
      if (category_ids.length > 0) {
        query.category_id = { [Op.in]: category_ids };
      }
    
      // Aplica o filtro 'price_range'
      if (price_range) {
        const [minPrice, maxPrice] = price_range.split('-').map(Number);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          query.price = { [Op.between]: [minPrice, maxPrice] };
        }
      }
    
      // Aplica o filtro 'option'
      for (const [key, values] of Object.entries(option)) {
        if (Array.isArray(values) && values.length > 0) {
          query[`option_${key}`] = { [Op.in]: values };
        }
      }
    
      // Retorna produtos com limite e paginação aplicados
      const result = await this.handleRequest(Product.findAndCountAll({
        attributes: fields, // Seleciona os campos que devem ser retornados
        where: query, // Aplica os filtros de consulta
        limit, // Limita o número de resultados por página
        offset: (page - 1) * limit, // Calcula o deslocamento para paginação
      }), "Não foi possível localizar os produtos");
    
      // Adiciona o ID ao resultado se não estiver presente
      result.rows.forEach(product => {
        product.id = product.id;
      });
    
      return {
        count: result.count,
        rows: result.rows
      };
    }
    

  //Listando produtos por ID
  async findById(id) {
    const product = await this.handleRequest(Product.findByPk(id), `Não foi possível localizar o produto ${id}`);
    if (!product) throw new Error(`Produto ${id} não encontrado`);
    return product;
  }

  //Criando um novo produto
  async create(productData) {
    return this.handleRequest(Product.create(productData), "Não foi possível cadastrar o produto");
  }

  //Atualizando produto por id
  async update(productData, id) {
    const [updatedRows] = await this.handleRequest(
      Product.update(productData, { where: { id } }),
      "Não foi possível atualizar o produto"
    );
    if (updatedRows === 0) throw new Error("Produto não encontrado");
    return updatedRows;
  }

  //Apagando produto por id
  async delete(id) {
    const deletedRows = await this.handleRequest(
      Product.destroy({ where: { id } }),
      `Não foi possível apagar o produto ${id}`
    );
    if (deletedRows === 0) throw new Error(`Produto ${id} não encontrado`);
    return deletedRows;
  }


// Método para verificar se o nome ou a descrição do produto contém a string de busca
async searchProducts(searchString) {
  
  // Verifica se a string de busca está presente
    if (!searchString || typeof searchString !== 'string') {
      throw new Error('Invalid search string');
    }

    // Normaliza a string de busca (converte para minúsculas e remove espaços extras)
    const normalizedSearchString = searchString.trim().toLowerCase();

    // Construa a consulta para filtrar produtos com base na string de busca
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: normalizedSearchString, $options: 'i' } },
        { description: { $regex: normalizedSearchString, $options: 'i' } }
      ]
    }).exec();

      return products;
    }

}

export default new ProductRepository();
