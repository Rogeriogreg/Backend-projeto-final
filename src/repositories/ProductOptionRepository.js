import ProductOption from '../models/ProductOptions.js';

class ProductOptionRepository {

  //Função auxiliar p/ simplificar o tratamento de erros
  async handleRequest(promise, errorMsg) {
    try {
      return await promise;
    } catch (err) {
      console.error("Erro na manipulação da solicitação", err);
      throw new Error(errorMsg);
    }
  }

  //Listando todas as opções do produto
  async findAll() {
    return this.handleRequest(ProductOption.findAll(), "Não foi possível localizar as opções do produto");
  }

  //Listando por ID
  async findById(id) {
    const productOption = await this.handleRequest(ProductOption.findByPk(id), `Não foi possível localizar ${id}`);
    if (!productOption) throw new Error(`Opção ${id} não encontrado`);
    return productOption;
  }

  //Criando
  async create(productOptionData) {
    return this.handleRequest(ProductOption.create(productOptionData), "Não foi possível cadastrar");
  }

  //Atualizando por id
  async update(productOptionData, id) {
    const [updatedRows] = await this.handleRequest(
       ProductOption.update(productOptionData, { where: { id } }),
      "Não foi possível atualizar"
    );
    if (updatedRows === 0) throw new Error("Não foi possível encontrar");
    return updatedRows;
  }

  //Apagando usuário por id
  async delete(id) {
    const deletedRows = await this.handleRequest(
       ProductOption.destroy({ where: { id } }),
      `Não foi possível apagar ${id}`
    );
    if (deletedRows === 0) throw new Error(`Opção do produto ${id} não encontrado`);
    return deletedRows;
  }
}

export default new ProductOptionRepository();
