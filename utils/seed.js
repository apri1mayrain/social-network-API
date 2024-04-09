const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Connected.');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: 'users' })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('users');
  }

  let userCheck = await connection.db
    .listCollections({ name: 'thoughts' })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection('thoughts');
  }

  // User seed data
  const users = [
    {
      username: 'funny13UNNY',
      email: 'funny13UNNY@gmail.com',
    },
    {
      username: 'kindK0ala',
      email: 'kindK0ala@outlook.com',
    },
  ];

  // Thought seed data
  const thoughts = [
    {
      thoughtText: `Hey there! Just a friendly reminder to take care of yourself while you're out there hustling to reach your goals. Self-care is super important for your mental, emotional, and physical well-being. Don't forget to prioritize YOU! 💖😊`,
      username: 'kindK0ala',
    },
  ];

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});