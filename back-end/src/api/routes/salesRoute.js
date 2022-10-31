const express = require('express');
const Sales = require('../../controllers/salesController');

const router = express.Router();

router.route('/')
  .get(Sales.getAll)
  .post(Sales.create);

router.route('/:id')
  .get(Sales.findOne)
  .put(Sales.update);

router.route('/user')
  .post(Sales.findByUser);

module.exports = router;