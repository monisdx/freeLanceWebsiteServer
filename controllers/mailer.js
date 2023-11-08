import nodemailer from 'nodemailer';

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "smtp.elasticemail.com",
  auth: {
    user: "aviate@yopmail.com",
    pass: "FD4DDD161B71B2C7DCF320908E345F746784",
    serviceClient: "smtp.elasticemail.com"
  },
  host: "smtp.elasticemail.com",
  port: 2525,
  tls: true,
  
});

export const Send_Email = async (req, res) => {
//   const { to, subject, text } = req.body;

let to = "stalvishsandhu@gmail.com"
  let subject =  "formData.subject"
  let text = "formData.body"
  

  const mailOptions = {
    from: 'moniskhandx@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sending failed' });
  }
}