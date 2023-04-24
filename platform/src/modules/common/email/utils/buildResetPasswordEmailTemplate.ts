import { User } from '../../../domain/user/user';

export const buildResetPasswordEmailTemplate = (
  user: User,
  resetPasswordLink: string,
) => {
  return `
    <div>
      <p>Hi ${user.displayName},</p>
      <p>Forgot your password?</p>
      <p>We received a request to reset the password for your account.</p>
      <p>To reset your password, click on the button below:</p>
      <a href="${resetPasswordLink}">Reset password</a>
      <p>Or copy and paste the URL into your browser</p>
      <a href="${resetPasswordLink}">${resetPasswordLink}</a>
      <p>Note: The reset password link will be expired after 15 minutes</p>
      <br/>
      <br/>
      <div>Kind regards</div>
      <div>Retrospective Monster</div>
    </div>
  `;
};
