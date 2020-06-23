'use strict';

const sequelize = require("sequelize");

module.exports = {
 async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('trails_topics', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        trail_id: {
          type: Sequelize.INTEGER,
          references: { model: 'trail', key: 'id'},
          onDelete: 'CASCADE',
          allowNull: false,
        },
        topic_id: {
          type: Sequelize.INTEGER,
          references: { model: 'topic', key: 'id'},
          onDelete: 'CASCADE',
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

      await transaction.commit();  
   } catch (err) {
    await transaction.rollback();
    throw err;
  }
   
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('trails_topics');
   
  }
};
