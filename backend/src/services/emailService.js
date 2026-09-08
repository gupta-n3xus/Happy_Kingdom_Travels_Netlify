import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

function enquiryHtml(enquiry) {
  const submitted = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f4f4;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:24px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:#1a4731;padding:24px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Website Enquiry</h1>
          <p style="margin:4px 0 0;color:#c9a227;font-size:13px;">Happy Kingdom Travel</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:12px 16px;background:#f8faf8;border-radius:6px;">
                <h2 style="margin:0 0 12px;font-size:15px;color:#1a4731;border-bottom:1px solid #e0e0e0;padding-bottom:8px;">Customer Details</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:4px 0;color:#666;font-size:13px;width:120px;">Name</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;font-weight:600;">${enquiry.fullName || 'N/A'}</td></tr>
                  <tr><td style="padding:4px 0;color:#666;font-size:13px;">Email</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${enquiry.email || 'N/A'}</td></tr>
                  <tr><td style="padding:4px 0;color:#666;font-size:13px;">Phone</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${enquiry.phone || 'N/A'}</td></tr>
                  ${enquiry.whatsappNumber ? `<tr><td style="padding:4px 0;color:#666;font-size:13px;">WhatsApp</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${enquiry.whatsappNumber}</td></tr>` : ''}
                  ${enquiry.travelFrom ? `<tr><td style="padding:4px 0;color:#666;font-size:13px;">Travel From</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${enquiry.travelFrom}</td></tr>` : ''}
                </table>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
            <tr>
              <td style="padding:12px 16px;background:#f8faf8;border-radius:6px;">
                <h2 style="margin:0 0 12px;font-size:15px;color:#1a4731;border-bottom:1px solid #e0e0e0;padding-bottom:8px;">Subject</h2>
                <p style="margin:0;color:#1a1a1a;font-size:13px;">${enquiry.message ? enquiry.message.split('\n')[0].replace('Subject: ', '') : 'General Enquiry'}</p>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
            <tr>
              <td style="padding:12px 16px;background:#f8faf8;border-radius:6px;">
                <h2 style="margin:0 0 12px;font-size:15px;color:#1a4731;border-bottom:1px solid #e0e0e0;padding-bottom:8px;">Message</h2>
                <p style="margin:0;color:#1a1a1a;font-size:13px;white-space:pre-wrap;">${enquiry.message || 'N/A'}</p>
              </td>
            </tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
            <tr>
              <td style="padding:12px 16px;background:#f8faf8;border-radius:6px;">
                <h2 style="margin:0 0 12px;font-size:15px;color:#1a4731;border-bottom:1px solid #e0e0e0;padding-bottom:8px;">Source &amp; Travel Details</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:4px 0;color:#666;font-size:13px;width:120px;">Source</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${enquiry.source || 'Website'}</td></tr>
                  ${enquiry.travelDate ? `<tr><td style="padding:4px 0;color:#666;font-size:13px;">Travel Date</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${new Date(enquiry.travelDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td></tr>` : ''}
                  ${enquiry.adults ? `<tr><td style="padding:4px 0;color:#666;font-size:13px;">Adults</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${enquiry.adults}</td></tr>` : ''}
                  ${enquiry.children ? `<tr><td style="padding:4px 0;color:#666;font-size:13px;">Children</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${enquiry.children}</td></tr>` : ''}
                  <tr><td style="padding:4px 0;color:#666;font-size:13px;">Submitted</td><td style="padding:4px 0;color:#1a1a1a;font-size:13px;">${submitted}</td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background:#f0f0f0;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#999;font-size:11px;">This enquiry was submitted via the Happy Kingdom Travel website.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function enquiryText(enquiry) {
  const submitted = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  return `
New Website Enquiry - Happy Kingdom Travel
==========================================

Customer Details
----------------
Name:    ${enquiry.fullName || 'N/A'}
Email:   ${enquiry.email || 'N/A'}
Phone:   ${enquiry.phone || 'N/A'}
${enquiry.whatsappNumber ? `WhatsApp: ${enquiry.whatsappNumber}` : ''}
${enquiry.travelFrom ? `Travel From: ${enquiry.travelFrom}` : ''}

Subject
-------
${enquiry.message ? enquiry.message.split('\n')[0].replace('Subject: ', '') : 'General Enquiry'}

Message
-------
${enquiry.message || 'N/A'}

Source & Travel Details
-----------------------
Source:    ${enquiry.source || 'Website'}
${enquiry.travelDate ? `Travel Date: ${new Date(enquiry.travelDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}` : ''}
${enquiry.adults ? `Adults: ${enquiry.adults}` : ''}
${enquiry.children ? `Children: ${enquiry.children}` : ''}
Submitted: ${submitted}
`;
}

export async function sendEnquiryNotification(enquiry) {
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

  const mailOptions = {
    from: `"Happy Kingdom Travel" <${process.env.SMTP_USER}>`,
    to: contactEmail,
    subject: `New Website Enquiry - ${enquiry.fullName || 'Unknown'}`,
    text: enquiryText(enquiry),
    html: enquiryHtml(enquiry),
  };

  try {
    const info = await getTransporter().sendMail(mailOptions);
    console.log('Enquiry notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send enquiry notification:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendMail({ to, subject, text, html }) {
  const mailOptions = {
    from: `"Happy Kingdom Travel" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await getTransporter().sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
}
