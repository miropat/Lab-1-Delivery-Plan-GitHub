// Import required modules
const MongoClient = require('mongodb').MongoClient;

// Connection URI and Database Name
const uri = "mongodb://localhost:27017"; // Change this URI to your MongoDB connection string
const dbName = "chatAppDB"; // Change this to your database name

// Function to test the database connection
async function testDatabaseConnection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Database connection successful!");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    } finally {
        // Close the database connection
        await client.close();
    }
}

// Jest test suite for testing the database connection
describe('Database Connection', () => {
    test('Should connect to the database successfully', async () => {
        await expect(testDatabaseConnection()).resolves.toBe(undefined);
    });
});
