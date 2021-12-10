const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

class Product extends Model { }
Product.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ean: {
        type: DataTypes.STRING
    },
    imageUrl: DataTypes.STRING
}, { sequelize, modelName: 'Product', timestamps: false })

module.exports = Product;