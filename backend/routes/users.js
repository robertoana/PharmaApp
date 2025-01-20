const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/generateFakeUsers', userController.generateFakeUsers);

module.exports = router;
