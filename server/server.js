import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

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
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

connectToDatabase();

// GET ALL SHOES - WORKS
// http://localhost:3000/shoes
app.get("/shoes", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const shoes = await collection.find({}).toArray();
    res.json(shoes);
  } catch (err) {
    console.error("Error in Server.js - GET Shoes:", err);
    res
      .status(500)
      .json({ error: "Hmmm, something smells... No shoes for you! ☹" });
  }
});

// GET 1 SHOE - WORKS
// http://localhost:3000/shoes/123
app.get("/shoes/:id", async (req, res) => {
  try {
    const db = client.db(dbName);
    const _id = parseInt(req.params.id);

    console.log("_id:", _id);
    const collection = db.collection(collectionName); // 'shoes'
    const shoes = await collection
      .find({ "shoeDetails.shoe_id": _id })
      .toArray();

    console.log("Shoes Query result:", shoes);
    res.json(shoes);
  } catch (err) {
    console.error("Error in Server.js - GET Shoes:", err);
    res
      .status(500)
      .json({ error: "Hmmm, something smells... No shoes for you! ☹" });
  }
});


// Search dynamicly - category and search term
// http://localhost:3000/search
app.post('/search', async (req, res) => {
    try {
        // searchTerm = req.params
        // req.body.categoryName = "style";
        const { searchTerm, categoryName } = req.body;
        console.log("req.body:", req.body)
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        
        let query = {};
        if (isNaN(searchTerm)) {
            // If searchTerm is not a number, use regex for string matching
            const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
            query[`shoeDetails.${categoryName}`] = regex; // Dynamically set the field name
        } else {
            // If searchTerm is a number, convert it to an integer
            query[`shoeDetails.${categoryName}`] = parseInt(searchTerm);
        }

        const shoes = await collection.find(query).toArray();
        
        // const shoes = await collection.find({ 'shoeDetails.brand': regex }).toArray();
        console.log('shoe response:', shoes)
        res.json(shoes);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});


// Page Navigation
app.get("/shoes/:page/:limit", async (req, res) => {
  try {
    let { page, limit } = req.params;
    limit = +limit; // The + converts limit from a string to integer.
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const shoes = await collection
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    res.json(shoes);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({
        error: "Hmm, something doesn't smell right... Error fetching shoes! ☹",
      });
  }
});

// Example route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
