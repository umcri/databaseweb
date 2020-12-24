const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.render('main');
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