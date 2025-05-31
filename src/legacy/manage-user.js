const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Your MongoDB URI from .env.local
const uri = "mongodb+srv://db_itournary_user:db_1uSHHjXZ763lQe3z@itournarydb.mkxkrma.mongodb.net/?retryWrites=true&w=majority&appName=iTournaryDB";

async function createUser() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db("itournary_app_data");
    const users = db.collection('users');
    
    // Create test user
    const email = "test@example.com";
    const password = "password123";
    const name = "Test User";
    
    // Check if user exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log("User already exists, updating password...");
      
      // Update password
      const hashedPassword = await bcrypt.hash(password, 10);
      await users.updateOne(
        { email },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );
      console.log("Password updated successfully");
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await users.insertOne({
        name,
        email,
        password: hashedPassword,
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log("User created with ID:", result.insertedId);
    }
    
    // List all users
    console.log("\nAll users in database:");
    const allUsers = await users.find({}).toArray();
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

createUser().catch(console.error);
