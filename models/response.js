const { Model, DataTypes } = require("sequelize/dist");
const sequelize = require('../db/connection');
const Solicitation = require('./solicitation');
const User = require("./user");

class Response extends Model { };
Response.init({
    solicitationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Solicitation,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'enroll'
        }
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Response',
    timestamps: true
})

module.exports = Response;