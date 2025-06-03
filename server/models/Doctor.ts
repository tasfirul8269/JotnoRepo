import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: String,
  address: String,
  consultationTimings: String
});

const contactSchema = new mongoose.Schema({
  phone: String,
  whatsApp: String,
  email: String,
  facebook: String,
  instagram: String,
  website: String
});

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  degree: String,
  specialty: String,
  primaryAffiliation: String,
  otherLocations: [locationSchema],
  fees: Number,
  yearsExperience: Number,
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  languages: [String],
  bmdcRegistration: String,
  studiedAt: String,
  livesIn: String,
  contactInformation: contactSchema,
  additionalInfo: String,
  availability: [{
    day: String,
    slots: [{
      time: String,
      isAvailable: Boolean
    }]
  }]
}, {
  timestamps: true
});

export default mongoose.model('Doctor', doctorSchema);