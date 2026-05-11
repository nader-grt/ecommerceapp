'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('secrtrie_dayWorks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      
       secrtrieid: {
        type: Sequelize.INTEGER,
       // type: Sequelize.INTEGER.UNSIGNED,
         allowNull: false,
         references: {
           model: 'secrtries',
           key: 'id',
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       },
      
       dayWorkid: {
        type: Sequelize.INTEGER,
       // type: Sequelize.INTEGER.UNSIGNED,
         allowNull: false,
         references: {
           model: 'dayWorks',
           key: 'id',
         },
         onDelete: 'NO ACTION',
       },
       createdAt: Sequelize.DATE,
       updatedAt: Sequelize.DATE,
     
      
      });
     
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.dropTable('secrtrie_dayWorks');
     
  }
};
