// lib/telegram.js
// Optional: sends instant phone notification when someone enrolls
// Setup: Create a bot via @BotFather on Telegram, get token + chat ID

export async function sendTelegramAlert(enrollment) {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Silently skip if not configured — Telegram is optional
  if (!token || !chatId) {
    console.log('[Telegram] Not configured — skipping alert.');
    return;
  }

  const submitted = new Date(enrollment.createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Telegram supports MarkdownV2 — escape special chars
  const esc = (s) => String(s || '').replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');

  const message = `
🎯 *New Enrollment — Success Education*

👤 *Name:* ${esc(enrollment.name)}
📞 *Phone:* [${esc(enrollment.phone)}](tel:+91${enrollment.phone})
✉️ *Email:* ${esc(enrollment.email)}
📍 *City:* ${esc(enrollment.city || '—')}
📚 *Course:* ${esc(enrollment.course)}
🔗 *Source:* ${esc(enrollment.source)}
${enrollment.description ? `💬 *Message:* ${esc(enrollment.description.slice(0, 150))}` : ''}

📅 *Submitted:* ${esc(submitted)}

[📞 Call Now](tel:+91${enrollment.phone}) | [💬 WhatsApp](https://wa.me/91${enrollment.phone})
  `.trim();

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id:    chatId,
      text:       message,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Telegram API error: ${err}`);
  }
}