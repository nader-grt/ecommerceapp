'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.createTable('secrtries', {
     


        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true, // 
          type: Sequelize.INTEGER,
        },
  
        employeeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true, //  
          references: {
            model: 'Employees',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
  
        // daysWorking: {
        //   type: Sequelize.STRING, // : "Sun-Mon-Tue"
        //   allowNull: false,
        // },
        nbrAppointments: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
  
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
  
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          ),},

        
        });
     
  },

  async down (queryInterface, Sequelize) {
 
      await queryInterface.dropTable('secrtries');
     
  }
};
