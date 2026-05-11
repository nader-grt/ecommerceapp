'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('Products', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('Products', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    });

    await queryInterface.addIndex('Products', ['categoryId']);
    await queryInterface.addIndex('Products', ['supplierId']);
     
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.changeColumn('Products', 'createdAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn('Products', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });

    await queryInterface.removeIndex('Products', ['categoryId']);
    await queryInterface.removeIndex('Products', ['supplierId']);
  }
};
