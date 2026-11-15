const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
    if (db) return db;
    
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db('library_db');
        console.log('✅ Connected to MongoDB');
        
        // Create Indexes
        await db.collection('books').createIndex({ isbn: 1 }, { unique: true });
        await db.collection('books').createIndex({ title: 'text', author: 'text' });
        await db.collection('loans').createIndex(
            { userId: 1, bookId: 1 }, 
            { unique: true, partialFilterExpression: { returnedAt: null } }
        );
        
        console.log('✅ Database Indexes Created');
        return db;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

function getDB() {
    if (!db) throw new Error('Database not initialized');
    return db;
}

module.exports = { connectDB, getDB };