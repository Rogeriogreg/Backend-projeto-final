import Category from '../models/Category.js';

class CategoryRepository {

  //Função auxiliar p/ simplificar o tratamento de erros
  async handleRequest(promise, errorMsg) {
    try {
      return await promise;
    } catch (err) {
      console.error("Erro na manipulação da solicitação", err);
      throw new Error(errorMsg);
    }
  }

  //Listando todas as categorias com filtros e paginação
  async findAll(limit = 10, page = 1, fields = ['name', 'slug'], useInMenu = null) {
    const query = {}; 
    if (useInMenu !== null) {
      query.use_in_menu = useInMenu;
    }

    // Verifica se o parâmetro 'limit' é -1 (sem limite)
    if (limit === -1) {
      // Retorna todas as categorias sem limite de paginação
      return this.handleRequest(Category.findAll({
        attributes: fields, // Seleciona os campos que devem ser retornados
        where: query, // Aplica os filtros de consulta
      }), "Não foi possível localizar as categorias");
    }

    // Retorna categorias com limite e paginação aplicados
    return this.handleRequest(Category.findAndCountAll({
      attributes: fields, // Seleciona os campos que devem ser retornados
      where: query, // Aplica os filtros de consulta
      limit, // Limita o número de resultados por página
      offset: (page - 1) * limit, // Calcula o deslocamento para paginação
    }), "Não foi possível localizar as categorias");
  }

  //Listando uma categoria por ID
  async findById(id) {
    //Busca a categoria pelo ID usando a PK
    const category = await this.handleRequest(Category.findByPk(id), `Não foi possível localizar a categoria ${id}`);
    if (!category) throw new Error(`Categoria ${id} não encontrada`);
    return category;
  }

  //Criando uma nova categoria
  async create(categoryData) {
    //Cria uma nova categoria com os dados fornecidos
    return this.handleRequest(Category.create(categoryData), "Não foi possível cadastrar a categoria");
  }

  //Atualizando uma categoria pelo ID
  async update(categoryData, id) {
    //Atualiza a categoria com os dados fornecidos e verifica o numero de linhas afetadas
    const [updatedRows] = await this.handleRequest(
      Category.update(categoryData, { where: { id } }),
      "Não foi possível atualizar a categoria"
    );
    if (updatedRows === 0) throw new Error("Categoria não encontrada");
    return updatedRows; 
  }

  //Deletando uma categoria pelo ID
  async delete(id) {
    //Deleta a categoria com o ID passado e verifica o número de linhas afetadas
    const deletedRows = await this.handleRequest(
      Category.destroy({ where: { id } }),
      `Não foi possível apagar a categoria ${id}`
    );
    if (deletedRows === 0) throw new Error(`Categoria ${id} não encontrada`);
    return deletedRows;
  }
}

export default new CategoryRepository();
