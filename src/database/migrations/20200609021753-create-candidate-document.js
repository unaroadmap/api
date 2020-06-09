'use strict';

const sequelize = require("sequelize");

module.exports = {
 async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('document', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 11,
        },
        pis: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 14,
        },
        rg: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 13,
        },
        titulo_eleitor: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 14,
        },
        titulo_zona: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 5,
        },
        titulo_secao: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 5,
        },
        certif_militar: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 14,
        },
        cnh: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 14,
        },
        ctps: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 10,
        },
        ctps_serie: {
          type: Sequelize.STRING,
          allowNull: false,
          size: 10,
        },
        candidate_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {         
            model: 'candidate',
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
  
      return queryInterface.dropTable('document');
   
  }
};
