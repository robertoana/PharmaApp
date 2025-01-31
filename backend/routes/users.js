const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/generateFakeUsers', userController.generateFakeUsers);
router.get('/getUser/:userId', userController.getUser);
router.post('/register', userController.registerUser);

module.exports = router;
