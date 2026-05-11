'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      nameImage: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      categoryId: {
       type: Sequelize.INTEGER,
      // type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'suplliers',//suplliers
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
