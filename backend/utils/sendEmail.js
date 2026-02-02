const transporter = require("../config/mail");

const sendEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `"DXV Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
