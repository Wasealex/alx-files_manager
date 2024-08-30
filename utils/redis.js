import { createClient } from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on("error", (error) => {
      console.error(`Redis client not connected to the server: ${error}`);
      this.isClientConnected = false;
    });
    this.client.on("connect", () => {
      this.isClientConnected = true;
    });
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
