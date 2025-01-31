const db = require('../config/config');
const { generateUsers } = require('../helpers/users');
const admin = require('firebase-admin');

const generateFakeUsers = async (req, res) => {
  const count = req.query.count ?? 2;
  try {
    const users = generateUsers(count);
    for (const user of users) {
      await db.collection('users').add(user);
    }
    return res.status(201).json({
      message: `${count} users generated successfully!`,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error' + err });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(userDoc.data());
  } catch (err) {
    return res.status(500).json({ message: 'Error: ' + err });
  }
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All the fields are mandatory!' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    const userData = {
      uid: userRecord.uid,
      email,
      name,
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    return res.status(201).json({
      message: 'Added!',
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error: ' + err });
  }
};

module.exports = { generateFakeUsers, getUser, registerUser };
