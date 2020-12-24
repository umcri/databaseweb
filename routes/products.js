const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create({
        name: req.body.name,
        productID: req.body.productID,
        supplierName: req.body.supName,
    });
    console.log(product);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/lookup', async (req, res, next) => {
    const att = req.query.attribute;
    const Pinput = req.query.Pinput;
    console.log(att)
    console.log(Pinput)
    if (!att || !Pinput) {
        return res.redirect('/lookup');
      }
    try {
        var ProductLookup;
        if(att === "name"){
            ProductLookup = await Product.findAll({
                where: {
                    name: Pinput
                }
            });
        } else if (att === "productID"){
            ProductLookup = await Product.findAll({
                where: {
                    productID: parseInt(Pinput)
                }
            });
        } else {
            ProductLookup = await Product.findAll({
                where: {
                    supplierName: Pinput
                }
            });
        }
        return res.render("lookup",{products: ProductLookup});
    } catch (err) {
      console.error(err);
      next(err);
    }
});

module.exports = router;