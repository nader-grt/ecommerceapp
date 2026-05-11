'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DeliverieOrders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, 
        references: {
          model: 'Orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      deliveryPersonId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'deliverers',// tzble delivrer person
          key: 'id',
        },
        onDelete: 'SET NULL',
      },

      status: {
        type: Sequelize.ENUM(
          'PENDING_PICKUP',
          'IN_TRANSIT',
          'DELIVERED',
          'CANCELLED'//NOTDELIVERD (choice : delivery refused from customer, customer not reached, others)
        ),
        allowNull: false,
        defaultValue: 'PENDING_PICKUP',
      },

      pickedUpAt: { // the time when the dilivery person picked up the order
        type: Sequelize.DATE,
        allowNull: true,
      },
      // comment: { // the time when the dilivery person picked up the order
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },

      deliveredAt: {// the actual time when the order was delivered to the customer
        type: Sequelize.DATE,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DeliverieOrders');
     
  }
};
