import RedisClient from '../utils/redis';
import DBClient from '../utils/db';

class AppController {
  // Get the status of Redis and DB connections
  static getStatus(request, response) {
    const status = {
      redis: RedisClient.isAlive(),
      db: DBClient.isAlive(),
    };
    return response.status(200).send(status);
  }

  // Get statistics for users and files
  static async getStats(request, response) {
    const stats = {
      users: await DBClient.nbUsers(),
      files: await DBClient.nbFiles(),
    };
    return response.status(200).send(stats);
  }
}

module.exports = AppController;
