import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.myClient = createClient(); // Create a new Redis client
    this.myClient.on('error', (error) => {
      console.log(error); // Log any errors
    });
  }

  // Method to check if the Redis client is connected
  isAlive() {
    return this.myClient.connected;
  }

  // Method to get a value from Redis based on the key
  async get(key) {
    const getAsync = promisify(this.myClient.GET).bind(this.myClient); // Promisify the GET command
    return getAsync(key); // Retrieve the value from Redis
  }

  // Method to set a value in Redis with an expiration time
  async set(key, val, time) {
    const setAsync = promisify(this.myClient.SET).bind(this.myClient); // Promisify the SET command
    return setAsync(key, val, 'EX', time); // Set the value in Redis with an expiration time
  }

  // Method to delete a value from Redis based on the key
  async del(key) {
    const delAsync = promisify(this.myClient.DEL).bind(this.myClient); // Promisify the DEL command
    return delAsync(key); // Delete the value from Redis
  }
}

const redisClient = new RedisClient(); // Create an instance of RedisClient

export default redisClient;
