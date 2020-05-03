'use strict';

const sequelize = require("sequelize");

module.exports = {
 async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('address', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cep: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        logradouro: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        complement: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        district_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {         
            model: 'district',
            key: 'id'
          }
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {         
            model: 'users',
            key: 'id'
          }
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
      await transaction.commit();  
   } catch (err) {
    await transaction.rollback();
    throw err;
  }
   
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('address');
   
  }
};
