import { getUserByEmail } from "../services/UserService.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/tokenService.js";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha obrigatórios." });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Usuário não encontrado." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Senha inválida." });
  }

  const token = generateToken(user.id);
  return res.status(200).json({ token });
}
