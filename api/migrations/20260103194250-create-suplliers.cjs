'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('suplliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
   
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      companyPhone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      companyEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // one-to-one
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      contactPerson: {
        type: Sequelize.STRING,
        allowNull: true,
      },

  

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
      
      
      });
     
  },

  async down (queryInterface, Sequelize) {
    
     
      await queryInterface.dropTable('suplliers');
     
  }
};
