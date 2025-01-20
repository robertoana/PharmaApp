const db = require('../config/config');
const { generateUsers } = require('../helpers/users');

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

module.exports = { generateFakeUsers };
