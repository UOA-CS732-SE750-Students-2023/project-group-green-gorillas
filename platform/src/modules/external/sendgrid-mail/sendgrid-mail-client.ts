import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export class SendgridMailClient {
  constructor(apiKey: string) {
    sgMail.setApiKey(apiKey);
  }

  public async sendEmail(mailData: MailDataRequired): Promise<void> {
    await sgMail.send(mailData);
  }
}
