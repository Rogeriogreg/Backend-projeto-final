import ProductImage from '../models/ProductImage.js';

class ProductImageRepository {

  //Função auxiliar p/ simplificar o tratamento de erros
  async handleRequest(promise, errorMsg) {
    try {
      return await promise;
    } catch (err) {
      console.error("Erro na manipulação da solicitação", err);
      throw new Error(errorMsg);
    }
  }

  //Listando tudo
  async findAll() {
    return this.handleRequest(ProductImage.findAll(), "Não foi possível localizar os produtos");
  }

  //Listando por ID
  async findById(id) {
    const productImage = await this.handleRequest(ProductImage.findByPk(id), `Não foi possível localizar o produto ${id}`);
    if (!productImage) throw new Error(`Produto ${id} não encontrado`);
    return productImage;
  }

  //Criando
  async create(productData) {
    return this.handleRequest(ProductImage.create(productData), "Não foi possível cadastrar o produto");
  }

  //Atualizando por id
  async update(productData, id) {
    const [updatedRows] = await this.handleRequest(
      ProductImage.update(productData, { where: { id } }),
      "Não foi possível atualizar o produto"
    );
    if (updatedRows === 0) throw new Error("Produto não encontrado");
    return updatedRows;
  }

  //Apagando por id
  async delete(id) {
    const deletedRows = await this.handleRequest(
       ProductImage.destroy({ where: { id } }),
      `Não foi possível apagar o produto ${id}`
    );
    if (deletedRows === 0) throw new Error(`Produto ${id} não encontrado`);
    return deletedRows;
  }
}

export default new ProductImageRepository();
