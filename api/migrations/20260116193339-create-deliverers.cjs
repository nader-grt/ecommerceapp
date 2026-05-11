'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('deliverers', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, // PK 
        type: Sequelize.INTEGER,
      },

      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, //  one-to-one
        references: {
          model: 'Employees',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      /**
       isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
       */
      carType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    
    
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('deliverers');
  }
};
