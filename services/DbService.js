const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

class DbService {
  constructor() {
    this.connected = false;
  }

  async getClient() {
    if (!this.connected) {
      try {
        await mongoose.connect(process.env.MONGO_URI);

        mongoose.connection.on('error', err => {
          console.error('MongoDB error:', err);
          this.connected = false;
        });

        mongoose.connection.on('disconnected', () => {
          console.warn('MongoDB disconnected');
          this.connected = false;
        });

        mongoose.connection.once('open', () => {
          console.log('✅ MongoDB connected');
          this.connected = true;
        });

      } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        throw err;
      }
    }

    return mongoose.connection;
  }

  autoLoadModels() {
    const modelsDir = path.join(__dirname, '../models');
    const files = fs.readdirSync(modelsDir);
    files.forEach(file => {
      if (file.endsWith('.js')) {
        require(path.join(modelsDir, file));
      }
    });
    console.log('✅ All models loaded from:', modelsDir);
  }
}

module.exports = new DbService();
