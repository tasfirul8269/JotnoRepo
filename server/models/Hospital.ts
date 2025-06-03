import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
  total: Number,
  available: Number,
  icu: {
    total: Number,
    available: Number
  }
});

const hospitalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  type: String,
  address: String,
  contact: String,
  email: String,
  website: String,
  specialties: [String],
  facilities: [String],
  emergency: Boolean,
  beds: bedSchema,
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  location: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true
});

export default mongoose.model('Hospital', hospitalSchema);