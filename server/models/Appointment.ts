import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  type: {
    type: String,
    enum: ['in-person', 'video', 'voice'],
    required: true
  },
  location: String,
  notes: String
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);