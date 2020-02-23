import mongoose from 'mongoose';

export async function connectToDatabase() {
  return mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

export async function disconnectFromDatabase(db) {
  return db.disconnect();
}
