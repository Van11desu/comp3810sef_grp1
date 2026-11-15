require('dotenv').config();
const { connectDB, getDB } = require('./db/db');
const bcrypt = require('bcrypt');

async function seed() {
    try {
        await connectDB();
        const db = getDB();

        // 1. Clear old data so we don't get duplicates if we run this twice
        await db.collection('users').deleteMany({});
        await db.collection('books').deleteMany({});
        await db.collection('loans').deleteMany({});
        console.log('🗑️ Cleared old data.');

        // 2. Create Users (Passwords are hashed for security)
        const passwordHash = await bcrypt.hash('password123', 10);
        const users = [
            { username: 'librarian1', passwordHash, role: 'librarian', name: 'Admin Sarah' },
            { username: 'member1', passwordHash, role: 'member', name: 'John Doe' },
            { username: 'member2', passwordHash, role: 'member', name: 'Jane Smith' }
        ];
        await db.collection('users').insertMany(users);
        console.log('👤 Users created (Password: password123)');

        // 3. Create Books
        const books = [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', category: 'Fiction', totalCopies: 3, availableCopies: 3 },
            { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', category: 'Technology', totalCopies: 2, availableCopies: 2 },
            { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', category: 'History', totalCopies: 4, availableCopies: 4 },
            { title: 'Harry Potter', author: 'J.K. Rowling', isbn: '9780590353427', category: 'Fantasy', totalCopies: 5, availableCopies: 5 },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', category: 'Fiction', totalCopies: 1, availableCopies: 1 }
        ];
        await db.collection('books').insertMany(books);
        console.log('📚 Books created.');

        console.log('✅ Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();