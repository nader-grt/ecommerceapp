'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     //await queryInterface.createTable('users', { id: Sequelize.INTEGER });

     await queryInterface.addConstraint('deliverer_dayWorks', {
      fields: ['delivererid', 'dayWorkid'],
      type: 'unique',
      name: 'unique_deliverer_daywork'
    });
    
     
  },

  async down (queryInterface, Sequelize) {
 
    // await queryInterface.dropTable('users');

    await queryInterface.removeConstraint('deliverer_dayWorks', 'unique_deliverer_daywork');

     
  }
};
