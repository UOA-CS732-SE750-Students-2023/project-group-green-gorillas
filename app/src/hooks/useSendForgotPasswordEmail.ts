import { useState } from "react";
import { authService } from "../services/authService";

export const useSendForgotPasswordEmail = () => {
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSendVerificationCode = async (email: string) => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setIsSendingEmail(true);
      await authService.requestResetPassword(email);

      setIsSuccessful(true);
    } catch (_) {
      setError(
        "Failed to send email, please check whether the email is valid or the user linked to the email is active"
      );
    } finally {
      setIsSendingEmail(false);
    }
  };

  return {
    onSendVerificationCode,
    isSendingEmail,
    isSuccessful,
    error,
  };
};
