const express = require('express');
const Admin = require('../../controllers/adminController');
const { checkToken, checkAdmin } = require('../../middlewares');

const router = express.Router();

router.route('/sellers')
  .get(Admin.getAllSellers);

router.route('/register')
  .post(checkToken, checkAdmin, Admin.registerByAdmin);

module.exports = router;