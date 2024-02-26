"use strict";
import twilio from 'twilio';
class twilioService {
  constructor(accountSid, authToken, twilioPhoneNumber) {
    this.client = twilio(accountSid, authToken);
    this.twilioPhoneNumber = twilioPhoneNumber;
  }
  async sendOtp(to, otp , body) {
    try {
      const message = await this.client.messages.create({
        body: `${body}: ${otp}`,
        from: this.twilioPhoneNumber,
        to: to,
      });
      console.log(`OTP sent to ${to} with message SID: ${message.sid}`);
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      return false;
    }
  }
}
export default twilioService;
