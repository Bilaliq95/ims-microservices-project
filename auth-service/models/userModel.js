const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
);

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt
});

/*
// Sync the model
sequelize.sync({ force: true })  // This will drop the existing table and recreate it based on the model
    .then(() => console.log("Users table has been created"))
    .catch((err) => console.log("Error creating table:", err));

 */


module.exports = { sequelize, User };
