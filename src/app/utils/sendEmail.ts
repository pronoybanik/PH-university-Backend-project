import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'bkpronoy1@gmail.com',
      pass: 'hrse exum tcrc pmny',
    },
  });

  await transporter.sendMail({
    from: 'bkpronoy1@gmail.com',
    to: to, // list of receivers
    subject: 'Reset your password within 10 mins', // Subject line
    text: '', // plain text body
    html: html, // html body
  });
};
