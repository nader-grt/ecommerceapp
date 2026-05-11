'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
 
 


    await queryInterface.addConstraint('OrderItems', {
      fields: ['orderId', 'productId'],
      type: 'unique',
      name: 'unique_order_product' 
    });
  
 
 
  //  await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     
  },

  async down (queryInterface, Sequelize) {
 

    await queryInterface.removeConstraint('OrderItems', 'unique_order_product');
  }
};
