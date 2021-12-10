const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./user');

class Center extends Model { };
Center.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    storeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    warehouseEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    managementEmail: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Center',
    timestamps: false
});



module.exports = Center;