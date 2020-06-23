'use strict';

const sequelize = require("sequelize");

module.exports = {
 async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM,
          values: ['Inactive','Active','Deleted']
        },
        profile: {
          type: Sequelize.ENUM,
          values: ['Candidato','Empresa','Administrador']
      },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },    
      },
      { transaction }
      );
      await queryInterface.bulkInsert('users', [{
        email: 'admin@unaroadmap.com.br',
        password: 'admin',
        status: 'Active',
        profile: 'Administrador',
        created_at: new Date(),
        updated_at: new Date()
      }]);
      await transaction.commit();  
   } catch (err) {
    await transaction.rollback();
    throw err;
  }
   
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('users');
   
  }
};
