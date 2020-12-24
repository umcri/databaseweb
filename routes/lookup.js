const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('lookup');
    } catch (err) {
    console.error(err);
    next(err);
    }
});

router.get('/main', async (req, res, next) => {
    try {
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
});

module.exports = router;