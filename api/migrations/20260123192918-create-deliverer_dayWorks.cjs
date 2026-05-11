'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('deliverer_dayWorks', { 
        
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nbrHours: {
          type: Sequelize.DECIMAL,
          allowNull: true,
        },


        delivererid: {
        type: Sequelize.INTEGER,
       // type: Sequelize.INTEGER.UNSIGNED,
       //   unique: true, 
         allowNull: false,
         references: {
           model: 'deliverers',
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
     
      
      /**
       * 
       indexes: [
  {
    unique: true,
    fields: ['delivererid', 'dayWorkid']
  }
]
not duplicate on relationshipt from many to many 
       */
      
      
      
      
      });
     
  },

  async down (queryInterface, Sequelize) {
 
      await queryInterface.dropTable('deliverer_dayWorks');
     
  }
};
