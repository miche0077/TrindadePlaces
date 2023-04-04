//[M1S09] Ex 2 - Modelo Sequelize
const Sequelize = require('sequelize')
const connection = require('../database');

const Place = connection.define('place',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    opening_hours: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false, 

    },
    latitude: {
        type: Sequelize.DECIMAL(8,4),
        allowNull: false,
    },
    longitude: {
        type: Sequelize.DECIMAL(8,4),
        allowNull: false,
    }   
})

module.exports = Place