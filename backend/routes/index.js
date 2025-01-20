const router = require('express').Router();

const medicineRouter = require('./medicines');
const transactionRouter = require('./transactions');
const userRouter = require('./users');

router.use('/medicines', medicineRouter);
router.use('/transactions', transactionRouter);
router.use('/users', userRouter);

module.exports = router;
