import { MongoClient } from 'mongodb';

// Constants for database connection details
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;  // Construct the MongoDB connection URL

class DBClient {
  constructor() {
    // Create a new MongoClient instance with the connection URL and options
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    
    // Connect to the MongoDB server
    this.client.connect().then(() => {
      this.db = this.client.db(DATABASE);  // Select the database
    }).catch((err) => {
      console.log(err);  // Log any connection errors
    });
  }

  // Method to check if the MongoDB client is connected
  isAlive() {
    return this.client.isConnected();
  }

  // Method to get the number of users in the 'users' collection
  async nbUsers() {
    const users = this.db.collection('users');  // Get the 'users' collection
    const usersNum = await users.countDocuments();  // Count the number of documents in the 'users' collection
    return usersNum;
  }

  // Method to get the number of files in the 'files' collection
  async nbFiles() {
    const files = this.db.collection('files');  // Get the 'files' collection
    const filesNum = await files.countDocuments();  // Count the number of documents in the 'files' collection
    return filesNum;
  }
}

const dbClient = new DBClient();  // Create an instance of DBClient

// Export the dbClient instance as the default export
module.exports = dbClient;
