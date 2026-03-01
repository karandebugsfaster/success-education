// app/api/enrollment/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import { sendOwnerAlert, sendStudentConfirmation } from '@/lib/mailer';
import { sendTelegramAlert } from '@/lib/telegram';

// ─── Helper: extract real IP ──────────────────────────────────────────────
function getIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// ─── Helper: sanitize input ───────────────────────────────────────────────
function sanitize(data) {
  return {
    name:        String(data.name        || '').trim().slice(0, 80),
    email:       String(data.email       || '').trim().toLowerCase().slice(0, 120),
    phone:       String(data.phone       || '').trim().replace(/\D/g, '').slice(0, 10),
    city:        String(data.city        || 'Other').trim(),
    course:      String(data.course      || '').trim(),
    description: String(data.description || '').trim().slice(0, 800),
    source:      String(data.source      || 'contact').trim(),
  };
}

// ════════════════════════════════════════════════════════════════════════════
// POST  /api/enrollment  — Submit enrollment form
// ════════════════════════════════════════════════════════════════════════════
export async function POST(request) {
  try {
    const body     = await request.json();
    const sanitized = sanitize(body);

    // ── 1. Validate manually before hitting DB ───────────────────────────
    if (!sanitized.name || sanitized.name.length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter your full name.' }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(sanitized.email)) {
      return NextResponse.json({ success: false, error: 'Enter a valid email address.' }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(sanitized.phone)) {
      return NextResponse.json({ success: false, error: 'Enter a valid 10-digit mobile number.' }, { status: 400 });
    }
    if (!sanitized.course) {
      return NextResponse.json({ success: false, error: 'Please select a course.' }, { status: 400 });
    }

    // ── 2. Connect to MongoDB ────────────────────────────────────────────
    await connectDB();

    // ── 3. Duplicate check: same phone + course within 24 hours ─────────
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existing = await Enrollment.findOne({
      phone:     sanitized.phone,
      course:    sanitized.course,
      createdAt: { $gte: cutoff },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'You already submitted a request for this course. Our team will call you soon!' },
        { status: 409 }
      );
    }

    // ── 4. Save to MongoDB ───────────────────────────────────────────────
    const enrollment = await Enrollment.create({
      ...sanitized,
      ip: getIP(request),
    });

    // ── 5. Fire notifications in parallel (non-blocking) ─────────────────
    // If any notification fails, student still gets success response.
    const notifyResults = await Promise.allSettled([
      sendOwnerAlert(enrollment),
      sendStudentConfirmation(enrollment),
      sendTelegramAlert(enrollment),
    ]);

    // Log failures server-side (visible in Vercel logs / local terminal)
    notifyResults.forEach((result, i) => {
      const label = ['Owner email', 'Student email', 'Telegram'][i];
      if (result.status === 'rejected') {
        console.error(`[Enrollment] ${label} failed:`, result.reason?.message || result.reason);
      } else {
        console.log(`[Enrollment] ${label} sent ✓`);
      }
    });

    // ── 6. Return success ────────────────────────────────────────────────
    return NextResponse.json(
      {
        success: true,
        message: `Thank you ${enrollment.name}! We received your request. Our counsellor will call you within 24 hours. Check your email for a confirmation.`,
        id: enrollment._id,
      },
      { status: 201 }
    );

  } catch (error) {
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)[0]?.message || 'Validation failed.';
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    console.error('[Enrollment POST] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

// ════════════════════════════════════════════════════════════════════════════
// GET  /api/enrollment  — Simple admin list (protect with env check)
// ════════════════════════════════════════════════════════════════════════════
export async function GET(request) {
  // Basic protection: require ?secret=YOUR_ADMIN_SECRET in query
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const page  = parseInt(searchParams.get('page')  || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip  = (page - 1) * limit;

    const [enrollments, total] = await Promise.all([
      Enrollment
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-ip -__v')
        .lean(),
      Enrollment.countDocuments(),
    ]);

    return NextResponse.json({
      success:     true,
      enrollments,
      total,
      page,
      totalPages:  Math.ceil(total / limit),
    });

  } catch (error) {
    console.error('[Enrollment GET] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch enrollments.' }, { status: 500 });
  }
}