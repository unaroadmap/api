'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf_or_cnpj: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        situacao: {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 1,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },      
      });
    
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('users');
  
  }
};
