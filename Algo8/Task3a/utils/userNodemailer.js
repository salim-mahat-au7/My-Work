const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendMailRG = async (email, token, mode) => {
  try {

    if (mode == "REGISTER") {
      return await transport.sendMail({
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: "Accoun Email Verfication Link ",
        html: `
        <h1>Verify the Mail ID</h1>
        <p>Please click link to confirm your email: 
            <a href="http://localhost:5000/api/user/userConfirmation/${token}">Click here to verify</a>
        </p>
      `,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const sendMailFP = async (email, secretToken, mode) => {
  try {
    if (mode == "OTP") {
      return await transport.sendMail({
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: "OTP For Password Reset",
        html: `
        <h1>Reset Password</h1>
        <p>Here is your otp to Reset the Password :<b>${secretToken}</b></p>
      `,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { sendMailRG, sendMailFP  };
