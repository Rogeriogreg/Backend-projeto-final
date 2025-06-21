const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado ao banco de dados com sucesso."))
  .catch((err) => console.error("❌ Erro ao conectar ao banco de dados:", err));

module.exports = sequelize;
