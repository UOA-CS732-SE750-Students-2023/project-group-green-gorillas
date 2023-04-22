import { useState } from "react";
import { authService } from "../services/authService";

export const useResetPassword = () => {
  const [verifiedError, setVerifiedError] = useState<string>("");

  const [resetPasswordError, setResetPasswordError] = useState("");

  const [isResetSuccess, setIsResetSuccess] = useState<boolean>(false);

  const [isResettingPassword, setIsResettingPassword] =
    useState<boolean>(false);

  const verifyResetPasswordToken = async (token: string) => {
    try {
      await authService.verifyResetPasswordToken(token);
    } catch (_) {
      setVerifiedError("Session timeout or invalid token provided");
    }
  };

  const resetPassword = async (
    newPassword: string,
    newPasswordMatch: string,
    token: string
  ) => {
    if (newPassword !== newPasswordMatch) {
      setResetPasswordError("Passwords must be same");
      return;
    }

    if (newPassword.length < 8) {
      setResetPasswordError("Password length must be at least 8 digits");
      return;
    }

    try {
      setIsResettingPassword(true);
      await authService.resetPassword(token, newPassword);
      setIsResetSuccess(true);
    } catch (_) {
      setResetPasswordError("Failed to reset password, please try again");
      await verifyResetPasswordToken(token);
    } finally {
      setIsResettingPassword(false);
    }
  };

  return {
    verifiedError,
    verifyResetPasswordToken,
    resetPassword,
    resetPasswordError,
    isResetSuccess,
    isResettingPassword,
  };
};
