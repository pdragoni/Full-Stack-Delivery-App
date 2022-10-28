const express = require('express');
const Users = require('../../controllers/usersController');

const router = express.Router();

router.route('/')
  .get(Users.getAll);

router.route('/login')
  .post(Users.login);

router.route('/register')
  .post(Users.register);

module.exports = router;