const db = require('../config/config');
const { generateMedicines } = require('../helpers/medicines');

const generateFakeMedicines = async (req, res) => {
  const count = req.query.count ?? 1;
  try {
    const medicines = generateMedicines(count);
    for (const medicine of medicines) {
      await db.collection('medicines').add(medicine);
    }
    return res.status(201).json({
      message: `${count} medicines generated successfully!`,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error' + err });
  }
};

const addMedicine = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      quantity,
      dosage,
      expiryDate,
      stockLot,
      manufacturer,
    } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !quantity ||
      !dosage ||
      !expiryDate ||
      !stockLot ||
      !manufacturer
    ) {
      return res.status(400).json({ message: 'All the fields are mandatory!' });
    }
    const newMedicine = { ...req.body };
    await db.collection('medicines').add(newMedicine);
    return res.status(200).json({ message: 'Medicine added!' });
  } catch (err) {
    return res.status(500).json({ message: 'Error' + err });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicineRef = db.collection('medicines');
    let medicines = [];
    const snapshot = await medicineRef.get();

    snapshot.forEach((doc) => {
      let currentDoc = { ...doc.data() };
      currentDoc.id = doc.id;
      medicines.push(currentDoc);
    });

    if (medicines.length === 0) {
      return res.status(404).send({ message: 'No medicines found' });
    } else {
      return res.status(200).json(medicines);
    }
  } catch (err) {
    return res.status(500).send({ message: 'Error' + err });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicineId = req.params.medicineId;
    const medicineRef = db.collection('medicines').doc(medicineId);
    const snapshot = await medicineRef.get();

    if (snapshot.exists) {
      const medicine = snapshot.data();
      medicine.id = snapshot.id;
      return res.status(200).json(medicine);
    } else {
      return res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Error' + err });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const medicineId = req.params.medicineId;
    let medicine = { ...req.body };
    await db.collection('medicines').doc(medicineId).update(medicine);
    return res.status(200).json(medicine);
  } catch (err) {
    return res.status(500).json({ message: 'Error' + err });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicineId = req.params.medicineId;
    await db.collection('medicines').doc(medicineId).delete();
    return res.status(200).json({ message: 'Medicine deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error' + err });
  }
};

const deleteAllMedicines = async (req, res) => {
  try {
    const collectionRef = db.collection('medicines');
    const snapshot = await collectionRef.get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return res.status(200).json({ message: 'Medicines delted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error: ' + err.message });
  }
};

module.exports = {
  generateFakeMedicines,
  addMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  deleteAllMedicines,
};
