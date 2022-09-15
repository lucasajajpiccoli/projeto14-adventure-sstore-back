import { MongoClient } from 'mongodb';

import '../setup.js';
import { DATABASE } from '../enums/database.js';

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
    await mongoClient.connect();
    console.log("MongoDB connected");
} catch (error) {
    console.log(error.message);
}
const db = mongoClient.db(DATABASE.NAME);

export {
    db
};