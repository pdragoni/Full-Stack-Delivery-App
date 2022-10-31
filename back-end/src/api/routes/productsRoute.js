const express = require('express');
const Products = require('../../controllers/productsController');

const router = express.Router();

router.route('/')
  .get(Products.getAll);

router.route('/:id')
  .get(Products.findOne);

module.exports = router;