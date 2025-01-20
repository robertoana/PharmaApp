const db = require('../config/config');
const { generateTransactions } = require('../helpers/transactions');

const generateFakeTransactions = async (req, res) => {
  const count = req.query.count ?? 2;
  try {
    const transactions = generateTransactions(count);
    for (const transaction of transactions) {
      const transactionRef = await db.collection('transactions').add({
        type: transaction.type,
        transactionPrice: transaction.transactionPrice,
        transactionsDate: transaction.transactionsDate,
        userId: transaction.userId,
      });
      await transactionRef.collection('medicines').add(transaction.medicine);
    }
    return res
      .status(201)
      .json({ message: `${count} transactions generated successfully!` });
  } catch (err) {
    return res.status(500).json({ message: 'Error' + err });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    let transactions = [];
    const snapshot = await db.collection('transactions').get();
    for (const doc of snapshot.docs) {
      let transaction = { ...doc.data(), id: doc.id };
      const medicineSnapshot = await db
        .collection('transactions')
        .doc(doc.id)
        .collection('medicines')
        .get();
      let medicines = [];
      medicineSnapshot.forEach((medicineDoc) => {
        medicines.push({ ...medicineDoc.data(), id: medicineDoc.id });
      });
      transaction.medicines = medicines;
      transactions.push(transaction);
    }
    return res.status(200).json({ transactions });
  } catch (err) {
    return res.status(500).send({ message: 'Error: ' + err.message });
  }
};

const getTransactionById = async (req, res) => {
  const transactionId = req.params.transactionId;
  try {
    const transactionSnapshot = await db
      .collection('transactions')
      .doc(transactionId)
      .get();
    const transaction = transactionSnapshot.data();
    transaction.id = transactionSnapshot.id;

    const medicinesSnapshot = await db
      .collection('transactions')
      .doc(transactionId)
      .collection('medicines')
      .get();
    const medicines = [];
    medicinesSnapshot.forEach((medicineDoc) => {
      medicines.push({ ...medicineDoc.data(), id: medicineDoc.id });
    });

    transaction.medicines = medicines;

    if (!transactionSnapshot.exists) {
      return res.status(404).json({ message: 'No transaction found' });
    } else {
      return res.status(200).json(transaction);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error: ' + err.message });
  }
};

const deleteTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    await db.collection('transactions').doc(transactionId).delete();
    return res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error' + err });
  }
};

const deleteTransactions = async (req, res) => {
  try {
    const collectionRef = db.collection('transactions');
    const snapshot = await collectionRef.get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return res.status(200).json({ message: 'Transactions deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Error: ' + err.message });
  }
};

module.exports = {
  generateFakeTransactions,
  getAllTransactions,
  getTransactionById,
  deleteTransactionById,
  deleteTransactions,
};
