import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    tableName: 'users',
    timestamps: true, 
    hooks: {
        //Hook p/ hashear a senha antes de salvar o usuário
        beforeSave: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    },
    //Adicionando um método p/ fzr a validação
    instanceMethods: {
        async validatePassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

export default User;