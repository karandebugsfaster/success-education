// models/Enrollment.js
import mongoose from 'mongoose';

// ─── Course names must match EXACTLY what lib/courses-data.js exports ───
const VALID_COURSES = [
  'SAMADHI',
  'ASPIRE',
  'RE-RAW',
  'ENDURANCE',
  'ANUBHAVI',
  'SAHAYAK',
  'LAW',
  'UDAY',
];

const VALID_CITIES = [
  'Ahmedabad',
  'Gandhinagar',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Other',
];

const VALID_SOURCES = [
  'contact',
  'courses',
  'interview',
  'home',
  'popup',
];

const EnrollmentSchema = new mongoose.Schema(
  {
    // ── Personal Details ──────────────────────────────────────
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name too long'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address'],
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'],
    },

    city: {
      type: String,
      trim: true,
      enum: {
        values: VALID_CITIES,
        message: 'Please select a valid city',
      },
      default: 'Other',
    },

    // ── Course Selection ──────────────────────────────────────
    course: {
      type: String,
      required: [true, 'Please select a course'],
      trim: true,
      enum: {
        values: VALID_COURSES,
        message: 'Please select a valid course',
      },
    },

    // ── Optional message ──────────────────────────────────────
    description: {
      type: String,
      trim: true,
      maxlength: [800, 'Message too long (max 800 characters)'],
      default: '',
    },

    // ── Metadata ──────────────────────────────────────────────
    source: {
      type: String,
      enum: {
        values: VALID_SOURCES,
        message: 'Invalid source',
      },
      default: 'contact',
    },

    // Status for admin tracking (new → called → enrolled → closed)
    status: {
      type: String,
      enum: ['new', 'called', 'demo_scheduled', 'enrolled', 'not_interested', 'closed'],
      default: 'new',
    },

    // Optional admin notes
    notes: {
      type: String,
      default: '',
    },

    // IP for basic duplicate/spam detection (never shown in UI)
    ip: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
    versionKey: false,
  }
);

// ── Indexes ────────────────────────────────────────────────────────────────
// Prevent duplicate: same phone + same course within 24 hours
EnrollmentSchema.index({ phone: 1, course: 1 });
EnrollmentSchema.index({ createdAt: -1 }); // sort by newest for admin
EnrollmentSchema.index({ status: 1 });      // filter by status in admin

// ── Model (singleton-safe for Next.js hot reload) ──────────────────────────
const Enrollment =
  mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;