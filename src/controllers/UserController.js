import UserRepository from "../repositories/UserRepository.js";

class UserController {

  //Método p/ listar todos os usuários
  async index(req, res) {
    try {
      //Chamando o repositório p/ listar todos os usuários
      const users = await UserRepository.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ obter um usuário específico pelo ID
  async show(req, res) {
    try {
      //Chama o repositório p/ listar um usuário pelo ID
      const user = await UserRepository.findById(req.params.id);
      //Se o usuário não for encontrado, responde com status 404
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ criar um novo usuário
  async store(req, res) {
    try {
      //Chama o repositório p/ criar um novo usuário
      const newUser = await UserRepository.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método p/ atualizar um usuário existente
  async update(req, res) {
    try {
      //Chama o repositório p/ atualizar o usuário
      const updated = await UserRepository.update(req.body, req.params.id);
      //Se nenhum usuário for encontrado ou nenhuma alteração for realizada, responde com status 404
      if (!updated) {
        return res.status(404).json({ error: "Usuário não encontrado ou nenhuma alteração realizada" });
      }
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Método para deletar um usuário
  async delete(req, res) {
    try {
      //Chama o repositório p/ apagar o usuário pelo ID
      const deleted = await UserRepository.delete(req.params.id);
      //Se o usuário não for encontrado, responde com status 404
      if (!deleted) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new UserController();
