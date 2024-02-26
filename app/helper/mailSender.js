"use strict";
// import mailConfig from '../../config/mail.config'
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();
import sendGridMail from "@sendgrid/mail";
import emailPages from '../pages/emailPages.js';
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

class mailSender {
  constructor() {
    // Create a transporter using SMTP
    // this.transporter = nodemailer.createTransport({
    //   service: mailConfig.service,
    //   auth: {
    //     user: mailConfig.auth_user,
    //     pass: mailConfig.auth_pass,
    //   },
    // });
  }
  async sendBugMail(email, description,) {
    console.log(email, 'mail', description,)
    // Define email options
    // const mailOptions = {
    //   from: mailConfig.senderMail,
    //   to,
    //   subject,
    //   text,
    // };
    // try {
    //   // Send email
    //   const info = await this.transporter.sendMail(mailOptions);
    //   console.log('Email sent:', info.response);
    //   return info;
    // } catch (error) {
    //   console.error('Error sending email:', error);
    //   throw new Error('Failed to send email');
    // }
    console.log('email sent successfully')
    return await sendGridMail.send(emailPages.bug_report(email, description, ''));
  }


}
export default mailSender;