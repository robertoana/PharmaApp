const router = require('express').Router();
const medicineController = require('../controllers/medicines');

router.post('/generateFakeMedicines', medicineController.generateFakeMedicines);
router.get('/getAllMedicines', medicineController.getAllMedicines);
router.get('/getMedicineById/:medicineId', medicineController.getMedicineById);
router.put('/:medicineId', medicineController.updateMedicine);
router.delete('/deleteMedicine/:medicineId', medicineController.deleteMedicine);
router.delete('/deleteAllMedicines', medicineController.deleteAllMedicines);

module.exports = router;
