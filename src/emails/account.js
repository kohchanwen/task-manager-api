const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chanwen1@hotmail.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chanwen1@hotmail.com',
        subject: 'Cancelation of account for App',
        text: `Sorry to hear that you have left us, ${name}. Let us know what we can do to keep you on board with us.`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}