const brevo = require("../config/mail");

const sendEmail = async ({ to, subject, text }) => {
  await brevo.post("/smtp/email", {
    sender: {
      name: "DXV Support",
      email: process.env.BREVO_SENDER_EMAIL
    },
    to: [{ email: to }],
    subject,
    textContent: text
  });
};

module.exports = sendEmail;


// const transporter = require("../config/mail");

// const sendEmail = async ({ to, subject, text }) => {
//   try {
//     await transporter.sendMail({
//       from: `"DXV Support" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = sendEmail;



