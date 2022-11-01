const express = require('express');
const Admin = require('../../controllers/adminController');

const router = express.Router();

router.route('/sellers')
  .get(Admin.getAllSellers);

router.route('/register')
  .post(Admin.registerByAdmin);

module.exports = router;