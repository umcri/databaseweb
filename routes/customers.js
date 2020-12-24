const express = require('express');
const Customer = require('../models/customer');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const customer = await Customer.create({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
    });
    console.log(customer);
    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/lookup', async (req, res, next) => {
    const att = req.query.attribute;
    const Cinput = req.query.Cinput;
    if (!att || !Cinput) {
        return res.redirect('/lookup');
      }
    try {
        var customerLookup;
        if(att === "name"){
            customerLookup = await Customer.findAll({
                where: {
                    name: Cinput
                }
            });
        } else if (att === "phone"){
            customerLookup = await Customer.findAll({
                where: {
                    phone: Cinput
                }
            });
        } else if (att === "address"){
            customerLookup = await Customer.findAll({
                where: {
                    address: Cinput
                }
            });
        } else {
            customerLookup = await Customer.findAll({
                where: {
                    gender: Cinput
                }
            });
        }
        return res.render("lookup",{customers: customerLookup});
    } catch (err) {
      console.error(err);
      next(err);
    }
});


module.exports = router;