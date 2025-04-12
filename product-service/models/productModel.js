// models/productModel.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
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

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    product_price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    product_category: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    product_details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'products',
    timestamps: false, // We don't need timestamps like createdAt, updatedAt for products
});

// Sync the model
/*
sequelize.sync({ force: true })  // This will drop and recreate the table based on the model
    .then(() => console.log("Products table has been created"))
    .catch((err) => console.log("Error creating products table:", err));

 */

module.exports = { sequelize, Product };
