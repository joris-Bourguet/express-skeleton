const mongoose = require('mongoose');
const {Schema} = mongoose;
const {v7: uuidV7} = require('uuid');

const VectorSchema = new Schema({
  id: { type: String, default: uuidV7 },
  // TODO: Add property here
}, { timestamps: true });

module.exports = mongoose.model('Vector', VectorSchema);