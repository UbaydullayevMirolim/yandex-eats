import nodemailer from 'nodemailer';

 export const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "umirolim2004@gmail.com",
      pass: "mirolim123456789",
    },
    secure: true,
});


export const send = async (mailData: Object) => {
  const data = await transporter.sendMail(mailData);

  return { message: "Success", data: data };
};


