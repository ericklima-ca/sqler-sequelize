const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Center = require('./center');
const Product = require('./product');
const User = require('./user');

class Solicitation extends Model { };
Solicitation.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order: {
        type: DataTypes.STRING
    },
    productId: {
        type: DataTypes.STRING,
        references: {
            key: 'id',
            model: Product
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    centerId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Center,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'processing', 'finished']]
        }
    },
    obs: {
        type: DataTypes.TEXT
    }
}, { sequelize, modelName: 'Solicitation', timestamps: true })

module.exports = Solicitation;