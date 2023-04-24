import { Injectable } from '@nestjs/common';
import { SendgridMailClient } from '../../external/sendgrid-mail/sendgrid-mail-client';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { User } from '../../domain/user/user';
import { buildResetPasswordEmailTemplate } from './utils/buildResetPasswordEmailTemplate';

@Injectable()
export class EmailService {
  private readonly fromEmail = 'retrospective.monster@gmail.com';

  constructor(private readonly sendGridClient: SendgridMailClient) {}

  public async sendEmail(mailData: MailDataRequired): Promise<void> {
    await this.sendGridClient.sendEmail(mailData);
  }

  public async sendResetPasswordEmail(
    toUser: User,
    resetPasswordLink: string,
  ): Promise<void> {
    await this.sendEmail({
      to: toUser.email,
      from: this.fromEmail,
      subject: 'Retrospective Monster - Reset Password Link',
      html: buildResetPasswordEmailTemplate(toUser, resetPasswordLink),
    });
  }
}
