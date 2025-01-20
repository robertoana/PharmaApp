const router = require('express').Router();
const transactionController = require('../controllers/transactions');

router.post('/generateFakeTransactions', transactionController.generateFakeTransactions);
router.get('/getAllTransactions', transactionController.getAllTransactions);
router.get('/getTransactionById/:transactionId', transactionController.getTransactionById);
router.delete('/deleteTransactionById/:transactionId', transactionController.deleteTransactionById);
router.delete('/deleteTransactions', transactionController.deleteTransactions);

module.exports = router;
