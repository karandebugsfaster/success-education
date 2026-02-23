// app/api/enrollment/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, course, standard, message, source } = body;

    // Sanitize
    const sanitized = {
      name: name?.toString().trim(),
      phone: phone?.toString().trim().replace(/\s/g, ''),
      email: email?.toString().trim().toLowerCase(),
      course: course?.toString().trim(),
      standard: standard?.toString().trim() || '',
      message: message?.toString().trim() || '',
      source: source || 'unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
    };

    // Basic server-side validation
    if (!sanitized.name || sanitized.name.length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter your full name.' }, { status: 400 });
    }
    if (!sanitized.phone || !/^[6-9]\d{9}$/.test(sanitized.phone)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }
    if (!sanitized.email || !/^\S+@\S+\.\S+$/.test(sanitized.email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!sanitized.course) {
      return NextResponse.json({ success: false, error: 'Please select a course.' }, { status: 400 });
    }

    await connectDB();

    // Duplicate check: same phone + course within 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existing = await Enrollment.findOne({
      phone: sanitized.phone,
      course: sanitized.course,
      createdAt: { $gte: oneDayAgo },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'You have already submitted a request for this course. Our team will contact you shortly.' },
        { status: 409 }
      );
    }

    const enrollment = await Enrollment.create(sanitized);

    return NextResponse.json(
      {
        success: true,
        message: 'Your enrollment request has been received! Our team will call you within 24 hours.',
        id: enrollment._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Enrollment API Error]', error);

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ success: false, error: messages[0] }, { status: 400 });
    }

    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Protected route: only for internal admin use
  // Add auth middleware before production
  try {
    await connectDB();
    const enrollments = await Enrollment.find({}).sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch enrollments.' }, { status: 500 });
  }
}