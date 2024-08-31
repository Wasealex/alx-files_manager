import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = await (await dbClient.client).db
      .collection('users')
      .findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex');
    const newUser = await (await dbClient.client).db
      .collection('users')
      .insertOne({ email, password: hashedPassword });

    return res.status(201).json({ id: newUser.insertedId, email });
  }
}

export default UsersController;
