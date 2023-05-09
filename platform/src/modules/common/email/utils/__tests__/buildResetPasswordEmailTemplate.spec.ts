import { buildResetPasswordEmailTemplate } from '../buildResetPasswordEmailTemplate';

describe('buildResetPasswordEmailTemplate', () => {
  it('should return a valid HTML template', () => {
    const user: any = {
      displayName: 'John Doe',
      email: 'johndoe@example.com',
    };
    const resetPasswordLink = 'https://example.com/reset-password/123456';

    const expectedTemplate = `
    <div>
      <p>Hi John Doe,</p>
      <p>Forgot your password?</p>
      <p>We received a request to reset the password for your account.</p>
      <p>To reset your password, click on the button below:</p>
      <a href="https://example.com/reset-password/123456">Reset password</a>
      <p>Or copy and paste the URL into your browser</p>
      <a href="https://example.com/reset-password/123456">https://example.com/reset-password/123456</a>
      <p>Note: The reset password link will be expired after 15 minutes</p>
      <br/>
      <br/>
      <div>Kind regards</div>
      <div>Retrospective Monster</div>
    </div>
  `;

    expect(buildResetPasswordEmailTemplate(user, resetPasswordLink)).toEqual(
      expectedTemplate,
    );
  });
});
