import sha1 from 'sha1';
import DBClient from '../utils/db';
import RedisClient from '../utils/redis';

const { ObjectId } = require('mongodb');

class UsersController {
  // Create a new user
  static async postNew(request, response) {
    const { email: userEmail, password: userPassword } = request.body;
    if (!userEmail) return response.status(400).send({ error: 'Missing email' });
    if (!userPassword) return response.status(400).send({ error: 'Missing password' });

    const oldUserEmail = await DBClient.db.collection('users').findOne({ email: userEmail });
    if (oldUserEmail) return response.status(400).send({ error: 'Already exist' });

    const shaUserPassword = sha1(userPassword);
    const result = await DBClient.db.collection('users').insertOne({ email: userEmail, password: shaUserPassword });

    return response.status(201).send({ id: result.insertedId, email: userEmail });
  }

  // Get user information by token
  static async getMe(request, response) {
    const token = request.header('X-Token') || null;
    if (!token) return response.status(401).send({ error: 'Unauthorized' });

    const redisToken = await RedisClient.get(`auth_${token}`);
    if (!redisToken) return response.status(401).send({ error: 'Unauthorized' });

    const user = await DBClient.db.collection('users').findOne({ _id: ObjectId(redisToken) });
    if (!user) return response.status(401).send({ error: 'Unauthorized' });

    return response.status(200).send({ id: user._id, email: user.email });
  }
}

module.exports = UsersController;
