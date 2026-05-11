'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.createTable('dayWorks', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameDay: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    
    
    
    });
     
  },

  async down (queryInterface, Sequelize) {
    
   
      await queryInterface.dropTable('dayWorks');
     
  }
};
