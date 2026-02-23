// models/Enrollment.js
import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    course: {
      type: String,
      required: [true, 'Please select a course'],
      enum: {
        values: [
          'IIT-JEE Foundation',
          'NEET Preparation',
          'IIT-JEE Advanced',
          'Board Excellence (Class 10)',
          'Board Excellence (Class 11-12)',
          'MHT-CET Crash Course',
          'Olympiad Training',
          'Doubt Clearing Program',
        ],
        message: 'Please select a valid course',
      },
    },
    standard: {
      type: String,
      trim: true,
      enum: {
        values: ['Class 8', 'Class 9', 'Class 10', 'Class 11 (Science)', 'Class 12 (Science)', 'Dropper / Repeater', ''],
        message: 'Invalid class standard',
      },
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
    },
    source: {
      type: String,
      enum: ['hero', 'courses', 'contact', 'popup', 'unknown'],
      default: 'unknown',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'enrolled', 'not_interested'],
      default: 'new',
    },
    ip: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto-managed
    versionKey: false,
  }
);

// Index for fast queries
EnrollmentSchema.index({ phone: 1 });
EnrollmentSchema.index({ email: 1 });
EnrollmentSchema.index({ course: 1 });
EnrollmentSchema.index({ status: 1 });
EnrollmentSchema.index({ createdAt: -1 });

// Prevent duplicate enrollments within 24 hours (same phone + course)
EnrollmentSchema.index(
  { phone: 1, course: 1, createdAt: 1 },
  { background: true }
);

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;