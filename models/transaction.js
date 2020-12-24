const Sequelize = require('sequelize');

module.exports = class Transaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      transactionNumber: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      productID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      customerName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Transaction',
      tableName: 'transactions',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

};