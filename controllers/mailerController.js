require(`dotenv/config`);
const nodemailer = require('nodemailer');
const password = process.env.GMAIL_PW;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'matchingapptech@gmail.com',
      pass: password
    }
  });

exports.sendMail = (req, res) => {
    console.log(req.body);
      var mailOptions = {
        from: 'matchingapptech@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        html: req.body.message + "<p><b>Dit e-mailbericht is een service van MATCHING APP. Wij pakken uw vraag/suggestie zo spoedig mogelijk op.</b></p>"
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      req.flash("success", "Mail verstuurd!");
      res.redirect('mail');
};
  