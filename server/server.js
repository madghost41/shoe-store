import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// Example route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // connectToDatabase(); // turned off for now
});
