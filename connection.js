// Node.js & MongoDb template for the sake of making the task. Generated with ChatGPT, -MP
// Import required modules
const MongoClient = require('mongodb').MongoClient;

// Connection URI and Database Name
const uri = "mongodb://localhost:27017"; // Change this URI to your MongoDB connection string
const dbName = "chatAppDB"; // Change this to your database name

// Function to save a message to the database
async function saveMessage(message) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        
        // Define the collection where messages will be stored
        const collection = db.collection('messages');

        // Insert the message into the collection
        const result = await collection.insertOne(message);
        console.log("Message saved successfully:", result.insertedId);
    } catch (err) {
        console.error("Error saving message:", err);
    } finally {
        // Close the database connection
        await client.close();
    }
}

// Example message object
const message = {
    sender: "User123",
    recipient: "User456",
    content: "Hello, how are you?",
    timestamp: new Date()
};

// Call the function to save the message to the database
saveMessage(message);
