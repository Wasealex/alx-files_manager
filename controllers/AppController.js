import dbClient from "../utils/db"; // eslint-disable-line
import redisClient from "../utils/redis"; // eslint-disable-line

class AppController {
  static async getStatus(req, res) {
    const dbAlive = dbClient.isAlive();
    const redisAlive = redisClient.isAlive();
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      res.status(200).json({ users, files });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching stats' });
    }
  }
}

export default AppController;
