/* eslint-disable no-console */
import mongoose from 'mongoose';
import { DB } from '../../config';

/**
 * Connects to MongoDB
 * @returns {Object} The database connection
 */
export function connectToMongo() {
  const mongooseUrl = `mongodb://${DB.HOST}:${DB.PORT}/${DB.NAME}`;

  console.info(`\nConnecting with MongoDB on ${mongooseUrl}`);

  mongoose.connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on('error', () => {
    console.error('CONNECTION ERROR WITH MONGO');

    process.exit();
  });

  mongoose.connection.once('open', () => {
    console.info('--- CONNECTED TO MONGO ---');
  });
}
