require(`dotenv/config`);
const path = require(`path`);
const nodemailer = require(`nodemailer`);
const password = process.env.GMAIL_PW;
const transporter = nodemailer.createTransport({
  service: `gmail`,
  auth: {
    user: `matchingapptech@gmail.com`,
    pass: password,
  },
});

exports.sendMail = (req, res) => {
  const imagePath = path.join(__dirname, '../static/images/banner.jpeg')
  const mailOptions = {
    from: `matchingapptech@gmail.com`,
    to: req.body.email,
    subject: req.body.subject,
    html: `<img src="cid:banner" style="width: 50%; height: 50%; margin-bottom: 2em;"/><br>${req.body.message}<p><b>Dit e-mailbericht is een service van MATCHING APP. Wij pakken uw vraag/suggestie zo spoedig mogelijk op</b> &#128221;</p>`,
    attachments: [{
        filename: 'banner.jpeg',
        path: imagePath,
        cid: 'banner' 
    }]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  req.flash(`success`, `Mail verstuurd!`);
  res.redirect(`mail`);
};