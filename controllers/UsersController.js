import crypto from 'crypto';
import dbClient from "../utils/db.js"; // eslint-disable-line

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExists = await dbClient.client
      .db('files_manager')
      .collection('users')
      .findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex');
    const newUser = { email, password: hashedPassword };

    await dbClient.client
      .db('files_manager')
      .collection('users')
      .insertOne(newUser);

    return res.status(201).json({ id: newUser._id, email: newUser.email });
  }
}

export default UsersController;
