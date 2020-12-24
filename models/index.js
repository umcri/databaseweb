const Sequelize = require('sequelize');
const Customer = require('./customer');
const Transaction = require('./transaction');
const Product = require('./product');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Customer = Customer;
db.Transaction = Transaction;
db.Product = Product;

Customer.init(sequelize);
Transaction.init(sequelize);
Product.init(sequelize);

module.exports = db;