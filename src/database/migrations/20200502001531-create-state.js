'use strict';

const sequelize = require("sequelize");

module.exports = {
 async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('state', { 
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
        sigla: {
          type: Sequelize.STRING,
          allowNull: false,
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

      await queryInterface.bulkInsert('state', [{
        id: 1,
        name: 'Acre',
        sigla: 'AC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Alagoas',
        sigla: 'AL',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Amapá',
        sigla: 'AP',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'Amazonas',
        sigla: 'AM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'Bahia',
        sigla: 'BA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name: 'Ceará',
        sigla: 'CE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        name: 'Distrito Federal',
        sigla: 'DF',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        name: 'Espírito Santo',
        sigla: 'ES',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        name: 'Goiás',
        sigla: 'GO',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        name: 'Maranhão',
        sigla: 'MA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 11,
        name: 'Mato Grosso',
        sigla: 'MT',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 12,
        name: 'Mato Grosso do Sul',
        sigla: 'MS',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 13,
        name: 'Minas Gerais',
        sigla: 'MG',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 14,
        name: 'Pará',
        sigla: 'PA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 15,
        name: 'Paraíba',
        sigla: 'PB',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 16,
        name: 'Paraná',
        sigla: 'PR',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 17,
        name: 'Pernambuco',
        sigla: 'PE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 18,
        name: 'Piauí',
        sigla: 'PI',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 19,
        name: 'Rio de Janeiro',
        sigla: 'RJ',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 20,
        name: 'Rio Grande do Norte',
        sigla: 'RN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 21,
        name: 'Rio Grande do Sul',
        sigla: 'RS',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 22,
        name: 'Rondônia',
        sigla: 'RO',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 23,
        name: 'Roraima',
        sigla: 'RR',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 24,
        name: 'Santa Catarina',
        sigla: 'SC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 25,
        name: 'São Paulo',
        sigla: 'SP',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 26,
        name: 'Sergipe',
        sigla: 'SE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 27,
        name: 'Tocantins',
        sigla: 'TO',
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
  
      return queryInterface.dropTable('state');
   
  }
};
