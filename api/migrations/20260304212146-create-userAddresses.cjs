"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userAddresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      zipeCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      delegation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      addressSuplementaire: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("userAddresses");
  },
};
