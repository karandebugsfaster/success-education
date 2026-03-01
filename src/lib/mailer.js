// lib/mailer.js
import nodemailer from 'nodemailer';

// ─── Transporter (Gmail SMTP — free, 500 emails/day) ─────────────────────
function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,         // your-institute@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD, // 16-char App Password (not your real password)
    },
  });
}

// ─── Shared email styles ──────────────────────────────────────────────────
const BASE_STYLES = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a2e;
`;

// ════════════════════════════════════════════════════════════════════════════
//  OWNER ALERT EMAIL
//  Sent to: OWNER_EMAIL
//  Purpose: Instant notification with all student details + quick action buttons
// ════════════════════════════════════════════════════════════════════════════
export async function sendOwnerAlert(enrollment) {
  const transporter = getTransporter();

  const submitted = new Date(enrollment.createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enrollment — Success Education</title>
</head>
<body style="margin:0; padding:0; background:#f0f4ff; ${BASE_STYLES}">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1464 0%, #2c3e8c 100%); border-radius: 16px 16px 0 0; padding: 28px 36px; text-align: center;">
              <table width="100%">
                <tr>
                  <td>
                    <div style="display:inline-block; background:#fcc419; width:44px; height:44px; border-radius:10px; text-align:center; line-height:44px; font-size:22px; font-weight:900; color:#1a1464; margin-bottom:12px;">S</div>
                    <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700;">🎉 New Enrollment Request!</h1>
                    <p style="margin:6px 0 0; color:rgba(255,255,255,0.65); font-size:14px;">Success Education · ${submitted}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ALERT BADGE -->
          <tr>
            <td style="background:#fcc419; padding:10px 36px; text-align:center;">
              <p style="margin:0; color:#1a1464; font-weight:700; font-size:13px; letter-spacing:0.1em; text-transform:uppercase;">
                ⚡ Action Required — Call within 2 hours for best results
              </p>
            </td>
          </tr>

          <!-- STUDENT DETAILS CARD -->
          <tr>
            <td style="background:#ffffff; padding: 32px 36px;">
              <h2 style="margin:0 0 20px; color:#1a1464; font-size:18px; font-weight:700; border-bottom: 2px solid #f0f4ff; padding-bottom:12px;">
                👤 Student Details
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                ${row('Full Name',      enrollment.name,        '👤')}
                ${row('Phone Number',   enrollment.phone,       '📞', `tel:+91${enrollment.phone}`)}
                ${row('Email Address',  enrollment.email,       '✉️', `mailto:${enrollment.email}`)}
                ${row('City',           enrollment.city || '—', '📍')}
                ${row('Course Selected',enrollment.course,      '📚')}
                ${row('Source Page',    enrollment.source,      '🔗')}
                ${enrollment.description ? row('Message', enrollment.description, '💬') : ''}
              </table>

              <!-- QUICK ACTION BUTTONS -->
              <table width="100%" cellpadding="0" cellspacing="12" style="margin-top:28px;">
                <tr>
                  <td width="33%" style="padding: 0 4px 8px 0;">
                    <a href="tel:+91${enrollment.phone}" style="display:block; background:#25d366; color:#ffffff; text-decoration:none; text-align:center; padding:12px 8px; border-radius:8px; font-weight:700; font-size:13px;">
                      📞 Call Now
                    </a>
                  </td>
                  <td width="33%" style="padding: 0 4px 8px;">
                    <a href="https://wa.me/91${enrollment.phone}?text=Hi%20${encodeURIComponent(enrollment.name)}%2C%20this%20is%20Success%20Education.%20We%20received%20your%20enrollment%20request%20for%20${encodeURIComponent(enrollment.course)}.%20When%20can%20we%20speak%3F" style="display:block; background:#128c7e; color:#ffffff; text-decoration:none; text-align:center; padding:12px 8px; border-radius:8px; font-weight:700; font-size:13px;">
                      💬 WhatsApp
                    </a>
                  </td>
                  <td width="33%" style="padding: 0 0 8px 4px;">
                    <a href="mailto:${enrollment.email}?subject=Your%20Enrollment%20at%20Success%20Education&body=Hi%20${encodeURIComponent(enrollment.name)}%2C" style="display:block; background:#4c6ef5; color:#ffffff; text-decoration:none; text-align:center; padding:12px 8px; border-radius:8px; font-weight:700; font-size:13px;">
                      ✉️ Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- METADATA ROW -->
          <tr>
            <td style="background:#f8fafc; padding:16px 36px; border-top:1px solid #e2e8f0;">
              <table width="100%">
                <tr>
                  <td style="font-size:11px; color:#94a3b8;">
                    🆔 ID: ${enrollment._id} &nbsp;|&nbsp;
                    📅 ${submitted} &nbsp;|&nbsp;
                    🌐 ${enrollment.ip || 'unknown'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a1464; border-radius:0 0 16px 16px; padding:20px 36px; text-align:center;">
              <p style="margin:0; color:rgba(255,255,255,0.45); font-size:12px;">
                Success Education · Gandhinagar, Gujarat · info@successeducation.in
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from:    `"Success Education Alerts" <${process.env.GMAIL_USER}>`,
    to:      process.env.OWNER_EMAIL,
    subject: `🎯 New Enrollment: ${enrollment.name} → ${enrollment.course} (${enrollment.phone})`,
    html,
  });
}

// ════════════════════════════════════════════════════════════════════════════
//  STUDENT CONFIRMATION EMAIL
//  Sent to: the student's email
//  Purpose: Confirm receipt, set expectations, build trust
// ════════════════════════════════════════════════════════════════════════════
export async function sendStudentConfirmation(enrollment) {
  const transporter = getTransporter();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enrollment Confirmed — Success Education</title>
</head>
<body style="margin:0; padding:0; background:#f0f4ff; ${BASE_STYLES}">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff; padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg, #1a1464 0%, #2c3e8c 100%); border-radius:16px 16px 0 0; padding:36px 36px 28px; text-align:center;">
              <div style="background:#fcc419; display:inline-block; width:52px; height:52px; border-radius:12px; text-align:center; line-height:52px; font-size:26px; font-weight:900; color:#1a1464; margin-bottom:16px;">S</div>
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700;">You're on your way! 🚀</h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.6); font-size:15px;">Success Education — UPSC Coaching</p>
            </td>
          </tr>

          <!-- GREEN SUCCESS BANNER -->
          <tr>
            <td style="background:#d1fae5; border:1px solid #6ee7b7; padding:14px 36px; text-align:center;">
              <p style="margin:0; color:#065f46; font-weight:700; font-size:14px;">
                ✅ We received your enrollment request for <strong>${enrollment.course}</strong>
              </p>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="background:#ffffff; padding:32px 36px 24px;">
              <p style="margin:0 0 12px; font-size:18px; color:#1a1464; font-weight:700;">
                Dear ${enrollment.name},
              </p>
              <p style="margin:0; color:#475569; font-size:15px; line-height:1.7;">
                Thank you for choosing <strong>Success Education</strong> for your UPSC journey. We've received your request and a counsellor will personally reach out to you within <strong>24 hours</strong> to discuss the <strong>${enrollment.course}</strong> program.
              </p>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT -->
          <tr>
            <td style="background:#ffffff; padding:0 36px 28px;">
              <h2 style="margin:0 0 18px; color:#1a1464; font-size:16px; font-weight:700; border-bottom:2px solid #f0f4ff; padding-bottom:10px;">
                📋 What happens next?
              </h2>

              ${step('1', '#fcc419', 'Counsellor Call (within 24 hours)', 'Our UPSC expert will call you to understand your current stage, goals, and answer all your questions about the course.')}
              ${step('2', '#4c6ef5', 'Free Demo Class', 'We\'ll schedule a free demo session so you can experience our teaching style and quality before committing.')}
              ${step('3', '#51cf66', 'Enroll & Begin', 'Once you\'re happy, you complete enrollment and receive access to all study materials, schedules, and the student portal.')}
              ${step('4', '#ff6b6b', 'Your UPSC Journey Starts', 'Join your batch, meet your mentor, and begin structured preparation with daily accountability.')}
            </td>
          </tr>

          <!-- BOOKING SUMMARY -->
          <tr>
            <td style="background:#f8fafc; margin:0 36px; padding:0 36px 28px;">
              <div style="background:#f0f4ff; border:1px solid #bac8ff; border-radius:12px; padding:20px 24px;">
                <h3 style="margin:0 0 14px; color:#1a1464; font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em;">Your Request Summary</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:4px 0; font-size:13px; color:#64748b; width:40%;">Course</td><td style="padding:4px 0; font-size:13px; color:#1a1464; font-weight:600;">${enrollment.course}</td></tr>
                  <tr><td style="padding:4px 0; font-size:13px; color:#64748b;">Name</td><td style="padding:4px 0; font-size:13px; color:#1a1464; font-weight:600;">${enrollment.name}</td></tr>
                  <tr><td style="padding:4px 0; font-size:13px; color:#64748b;">Phone</td><td style="padding:4px 0; font-size:13px; color:#1a1464; font-weight:600;">${enrollment.phone}</td></tr>
                  <tr><td style="padding:4px 0; font-size:13px; color:#64748b;">Email</td><td style="padding:4px 0; font-size:13px; color:#1a1464; font-weight:600;">${enrollment.email}</td></tr>
                  ${enrollment.city ? `<tr><td style="padding:4px 0; font-size:13px; color:#64748b;">City</td><td style="padding:4px 0; font-size:13px; color:#1a1464; font-weight:600;">${enrollment.city}</td></tr>` : ''}
                </table>
              </div>
            </td>
          </tr>

          <!-- CONTACT DETAILS -->
          <tr>
            <td style="background:#ffffff; padding:0 36px 32px;">
              <p style="margin:0 0 12px; color:#475569; font-size:14px;">
                Have an urgent question? Reach us directly:
              </p>
              <table>
                <tr>
                  <td style="padding:4px 0;">
                    <a href="tel:+919016867001" style="color:#1a1464; font-weight:700; text-decoration:none; font-size:14px;">📞 +91 90168 67001</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <a href="https://wa.me/919016867001" style="color:#25d366; font-weight:700; text-decoration:none; font-size:14px;">💬 WhatsApp Us</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <a href="mailto:info@successeducation.in" style="color:#4c6ef5; font-weight:700; text-decoration:none; font-size:14px;">✉️ info@successeducation.in</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a1464; border-radius:0 0 16px 16px; padding:24px 36px; text-align:center;">
              <p style="margin:0 0 6px; color:#fcc419; font-weight:700; font-size:13px;">Success Education</p>
              <p style="margin:0; color:rgba(255,255,255,0.45); font-size:11px;">
                W-207 Siddhraj Z Square (72), Kudasan, Gandhinagar, Gujarat<br>
                © ${new Date().getFullYear()} Success Education. All Rights Reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from:    `"Success Education" <${process.env.GMAIL_USER}>`,
    to:      enrollment.email,
    subject: `✅ Enrollment Request Received — ${enrollment.course} | Success Education`,
    html,
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Private helpers for building email table rows and timeline steps
// ────────────────────────────────────────────────────────────────────────────
function row(label, value, icon = '', href = '') {
  const cell = href
    ? `<a href="${href}" style="color:#4c6ef5; font-weight:600; text-decoration:none; font-size:14px;">${value}</a>`
    : `<span style="color:#1a1464; font-weight:600; font-size:14px;">${value}</span>`;

  return `
    <tr>
      <td style="padding:8px 12px 8px 0; vertical-align:top; width:40%; font-size:13px; color:#64748b;">
        ${icon} ${label}
      </td>
      <td style="padding:8px 0 8px 0; vertical-align:top;">
        ${cell}
      </td>
    </tr>
  `;
}

function step(num, color, title, desc) {
  return `
    <div style="display:flex; align-items:flex-start; margin-bottom:16px; gap:14px;">
      <div style="flex-shrink:0; width:32px; height:32px; background:${color}; border-radius:50%; text-align:center; line-height:32px; font-weight:900; color:#ffffff; font-size:14px;">${num}</div>
      <div>
        <p style="margin:0 0 2px; font-weight:700; color:#1a1464; font-size:14px;">${title}</p>
        <p style="margin:0; color:#64748b; font-size:13px; line-height:1.5;">${desc}</p>
      </div>
    </div>
  `;
}