import mongoose from 'mongoose';

const pharmacySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  address: String,
  contact: String,
  email: String,
  hours: String,
  delivery: Boolean,
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

export default mongoose.model('Pharmacy', pharmacySchema);