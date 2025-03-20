import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.VITE_MONGO_DB_URL; // MongoDB URL
const dbName = process.env.MONGO_DB; //  Database Name
const collectionName = process.env.MONGO_DB_COLLECTION; //  Database Collection name

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection
const client = new MongoClient(process.env.VITE_MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


// GET ALL SHOES - WORKS
// GET ALL SHOES - WORKS
app.get('/shoes', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const shoes = await collection.find({}).toArray();
        res.json(shoes);
        console.log('SHOE:', shoes)
    } catch (err) {
        console.error("Error in Server.js - GET Shoes:", err);
        res.status(500).send("Hmmm, something smells... No shoes for you! ☹");
    }
});

// GET 1 SHOE - WORKS
// http://localhost:3000/shoes/123
app.get('/shoes/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const _id = parseInt(req.params.id);

        console.log("_id:", _id)
        const collection = db.collection(collectionName); // 'shoes'
        const shoes = await collection.find({ "shoeDetails.shoe_id": _id}).toArray();

        console.log("Shoes Query result:", shoes);
        res.json(shoes);
    } catch (err) {
        console.error("Error in Server.js - GET Shoes:", err);
        res.status(500).send("Hmmm, something smells... No shoes for you! ☹");
    }
});

// Example route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToDatabase(); // turned off for now
});
