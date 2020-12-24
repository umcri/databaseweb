const express = require('express');
const Transaction = require('../models/transaction');
const { Op } = require("sequelize");
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      transactionNumber: req.body.transNum,
      productID: req.body.productID,
      price: req.body.price,
      date: req.body.date,
      customerName: req.body.cusName,
    });
    console.log(transaction);
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/lookup', async (req, res, next) => {
    const att = req.query.attribute;
    const Tinput = req.query.Tinput;
    console.log(att)
    console.log(Tinput)
    if (!att || !Tinput) {
        return res.redirect('/lookup');
      }
    try {
        var transactionLookup;
        if(att === "transNum"){
            transactionLookup = await Transaction.findAll({
                where: {
                    transactionNumber: Tinput
                }
            });
        } else if (att === "productID"){
            transactionLookup = await Transaction.findAll({
                where: {
                    productID: parseInt(Tinput)
                }
            });
        } else if (att === "price"){
            transactionLookup = await Transaction.findAll({
                where: {
                    price: {
                        [Op.and]:{
                            [Op.gt]: parseInt(Tinput),
                            [Op.lt]: parseInt(Tinput) + 1,
                        }
                    }
                }
            });
        } else if (att === "date"){
            transactionLookup = await Transaction.findAll({
                where: {
                    date: Tinput
                }
            });
        } else {
            transactionLookup = await Transaction.findAll({
                where: {
                    customerName: Tinput
                }
            });
        }
        console.log(transactionLookup.name);
        return res.render("lookup",{transactions: transactionLookup});
    } catch (err) {
      console.error(err);
      next(err);
    }
});

module.exports = router;