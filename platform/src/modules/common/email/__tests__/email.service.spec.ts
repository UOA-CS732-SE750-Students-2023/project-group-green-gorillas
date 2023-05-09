import { EmailService } from '../email.service';
import { buildResetPasswordEmailTemplate } from '../utils/buildResetPasswordEmailTemplate';

describe('EmailService', () => {
  let emailService: any;
  let sendGridClient: any;

  beforeEach(() => {
    sendGridClient = {
      sendEmail: jest.fn(),
    };
    emailService = new EmailService(sendGridClient);
  });

  describe('sendResetPasswordEmail', () => {
    it('should send a password reset email to the user with the reset password link', async () => {
      const user: any = { email: '123', fromEmail: '123' };
      const resetPasswordLink = 'https://example.com/reset-password';

      await emailService.sendResetPasswordEmail(user, resetPasswordLink);

      const expectedMailData = {
        to: user.email,
        from: emailService.fromEmail,
        subject: 'Retrospective Monster - Reset Password Link',
        html: buildResetPasswordEmailTemplate(user, resetPasswordLink),
      };

      expect(sendGridClient.sendEmail).toHaveBeenCalledWith(expectedMailData);
    });
  });
});
