const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

const sendWelcomeEmail = (email, name) => {
  const message = {
    from: "info@task-manager.com",
    to: email,
    subject: "Thanks for joining in",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
    html: `<p>Welcome to the app, ${name}. Let me know how you get along with the app</p>`
  };

  transporter.sendMail(message)
}

const sendCancellationEmail = (email, name) => {
  const message = {
    from: "info@task-manager.com",
    to: email,
    subject: "Sorry to see you go",
    text: `${name}, we are dissapointd you left.  Please let us know how can we improve our service`,
    html: `<p>${name}, we are dissapointd you left.  Please let us know how can we improve our service</p>`
  };

  transporter.sendMail(message)
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}

