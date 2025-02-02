const router = require('express').Router();
const medicineController = require('../controllers/medicines');
const authMiddleware = require('../middlewares/auth');

router.post('/generateFakeMedicines', medicineController.generateFakeMedicines);
router.post('/addMedicine', authMiddleware ,medicineController.addMedicine);
router.get('/getAllMedicines', medicineController.getAllMedicines);
router.get('/getMedicineById/:medicineId', medicineController.getMedicineById);
router.put('/:medicineId', medicineController.updateMedicine);
router.delete('/deleteMedicine/:medicineId', medicineController.deleteMedicine);
router.delete('/deleteAllMedicines', medicineController.deleteAllMedicines);

module.exports = router;
