const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      productID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      supplierName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Product',
      tableName: 'products',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

};