'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {  
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, //  
        type: Sequelize.INTEGER,
      },
      salary: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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

      hiredAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    
    





    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Employees');

    
  }
};
