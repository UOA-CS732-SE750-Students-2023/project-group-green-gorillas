import { AuthenticationRedirect } from "../../utils/AuthenticationRedirect";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined, Cancel, Check } from "@mui/icons-material";
import { ScreenPath } from "../../index";
import { CopyRight } from "../../../common/CopyRight";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useResetPassword } from "../../../../hooks/useResetPassword";
import { useHistory } from "react-router-dom";
import { parseQueryString } from "../../../../utils/parseQueryString";

export const ResetPasswordScreen = () => {
  return (
    <AuthenticationRedirect>
      <ResetPassword />
    </AuthenticationRedirect>
  );
};

const ResetPassword = () => {
  const { location } = useHistory();

  const token = useMemo(() => {
    const { token } = parseQueryString(location?.search ?? "");

    return token ?? "";
  }, [location]);

  const {
    verifiedError,
    verifyResetPasswordToken,
    resetPassword,
    resetPasswordError,
    isResetSuccess,
    isResettingPassword,
  } = useResetPassword();

  const timer = useRef<any>(null);
  const [timeToLeave, setTimeToLeave] = useState<number>(5);

  useEffect(() => {
    if (isResetSuccess && !timer.current) {
      timer.current = setInterval(() => {
        setTimeToLeave((timeToLeave) => {
          if (timeToLeave - 1 < 0) {
            window.location.href = ScreenPath.Login;
            return timeToLeave;
          }

          return timeToLeave - 1;
        });
      }, 1000);
    }
  }, [isResetSuccess, timeToLeave]);

  useEffect(() => {
    (async () => {
      await verifyResetPasswordToken(token);
    })();
  }, []);

  const navigateToForgotPassword = () => {
    window.location.href = ScreenPath.ForgotPassword;
  };

  const navigateToSignIn = () => {
    window.location.href = ScreenPath.Login;
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const newPassword = data.get("newPassword") as string;
    const newPasswordMatch = data.get("newPasswordMatch") as string;

    await resetPassword(newPassword, newPasswordMatch, token);
  };

  if (verifiedError) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <Cancel />
          </Avatar>
          <Typography mb={3} component="h1" variant="h5">
            Cannot Reset Password
          </Typography>
          <Typography component="h1" variant="h6">
            {verifiedError}
          </Typography>
          <Button
            onClick={navigateToForgotPassword}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Go to forgot password
          </Button>
        </Box>
        <CopyRight />
      </Container>
    );
  }

  if (isResetSuccess) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <Check />
          </Avatar>
          <Typography mb={3} component="h1" variant="h5">
            Reset Password Successfully
          </Typography>
          <Typography component="h1" variant="h6">
            Redirect you to sign in page in {timeToLeave} seconds
          </Typography>
          <Button
            onClick={navigateToSignIn}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Back to Sign in
          </Button>
        </Box>
        <CopyRight />
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      {resetPasswordError && (
        <Alert severity="error">{resetPasswordError}</Alert>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>

        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={onHandleSubmit}
          noValidate
          width={"100%"}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            type="password"
            label="New Password"
            name="newPassword"
            disabled={isResettingPassword}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPasswordMatch"
            label="Re-enter your new password"
            type="password"
            id="newPasswordMatch"
            disabled={isResettingPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isResettingPassword}
          >
            Confirm Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={ScreenPath.Login} variant="body2">
                Back to sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CopyRight />
    </Container>
  );
};
