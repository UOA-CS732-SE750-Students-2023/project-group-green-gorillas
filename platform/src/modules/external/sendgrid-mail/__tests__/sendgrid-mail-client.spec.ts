import { SendgridMailClient } from '../sendgrid-mail-client';
import * as sgMail from '@sendgrid/mail';

jest.mock('@sendgrid/mail');

describe('SendgridMailClient', () => {
  const apiKey = 'test-api-key';
  const mailData: any = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send email successfully', async () => {
    const sendSpy = jest.spyOn(sgMail, 'send').mockResolvedValue(undefined);
    const client = new SendgridMailClient(apiKey);
    await client.sendEmail(mailData);
    expect(sendSpy).toHaveBeenCalledWith(mailData);
  });

  it('should throw an error if email fails to send', async () => {
    const error = new Error('send error');
    const sendSpy = jest.spyOn(sgMail, 'send').mockRejectedValue(error);
    const client = new SendgridMailClient(apiKey);
    await expect(client.sendEmail(mailData)).rejects.toThrow(error);
    expect(sendSpy).toHaveBeenCalledWith(mailData);
  });
});
