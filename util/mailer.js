const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (sender, receiver, subject, message) => {
    const msg = {
        to: receiver,
        from: 'knowledgebase@random.com',
        subject: `New message from ${sender} (${subject}) | Knowledge Base`,
        text: message,
      };
      sgMail.send(msg);
}

module.exports = {
    sendEmail
}