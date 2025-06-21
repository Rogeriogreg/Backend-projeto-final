import User from '../models/User.js';
import bcrypt from 'bcryptjs';

class UserRepository {

  //Função auxiliar p/ simplificar o tratamento de erros
  async handleRequest(promise, errorMsg) {
    try {
      return await promise;
    } catch (err) {
      console.error("Erro na manipulação da solicitação", err);
      throw new Error(errorMsg);
    }
  }

  //Listando todos os usuários
  async findAll() {
    return this.handleRequest(User.findAll(), "Não foi possível localizar os Usuários");
  }

  //Listando usuário por ID
  async findById(id) {
    const user = await this.handleRequest(User.findByPk(id), `Não foi possível localizar o usuário ${id}`);
    if (!user) throw new Error(`Usuário ${id} não encontrado`);
    return user;
  }

  //Criando um novo usuário
  async create(userData) {
    //Hash da senha antes de criar o usuário
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.handleRequest(User.create(userData), "Não foi possível cadastrar o usuário");
  }

  //Atualizando usuário por id
  async update(userData, id) {
    if (userData.password) {
      //Hash da senha antes de atualizar
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const [updatedRows] = await this.handleRequest(
      User.update(userData, { where: { id } }),
      "Não foi possível atualizar o usuário"
    );
    if (updatedRows === 0) throw new Error("Usuário não encontrado");
    return updatedRows;
  }

  //Apagando usuário por id
  async delete(id) {
    const deletedRows = await this.handleRequest(
      User.destroy({ where: { id } }),
      `Não foi possível apagar o usuário ${id}`
    );
    if (deletedRows === 0) throw new Error(`Usuário ${id} não encontrado`);
    return deletedRows;
  }
}

export default new UserRepository();