const Sequelize = require('sequelize');

module.exports = class Customer extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(6),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Customer',
      tableName: 'customers',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

};