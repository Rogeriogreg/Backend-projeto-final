import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
  },
  updatedAt: {
      type: DataTypes.DATE,
      field: 'update_at',
      defaultValue: null,
      onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'categories',
  timestamps: false,
});

export default Category;
