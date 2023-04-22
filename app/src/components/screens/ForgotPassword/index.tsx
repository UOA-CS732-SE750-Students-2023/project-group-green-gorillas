import React, { useState } from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";
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
import { QuestionMark, Check } from "@mui/icons-material";
import { ScreenPath } from "../index";
import { CopyRight } from "../../common/CopyRight";
import { useSendForgotPasswordEmail } from "../../../hooks/useSendForgotPasswordEmail";

const ForgotPassword = () => {
  const { onSendVerificationCode, isSendingEmail, isSuccessful, error } =
    useSendForgotPasswordEmail();

  const [email, setEmail] = useState<string>("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSendVerificationCode(email);
  };

  const backToSignIn = () => {
    window.location.href = ScreenPath.Login;
  };

  return (
    <Container component="main" maxWidth="xs">
      {!isSuccessful ? (
        <>
          {error && <Alert severity="error">{error}</Alert>}
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
              <QuestionMark />
            </Avatar>

            <Typography component="h1" variant="h5">
              Forgot Password
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
                fullWidth
                onChange={onChangeEmail}
                value={email}
                disabled={isSendingEmail}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSendingEmail}
              >
                {isSendingEmail ? "Sending ..." : "Send Email"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href={ScreenPath.Login} variant="body2">
                    Back to sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <CopyRight />
          </Box>
        </>
      ) : (
        <>
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
              Sent Email Successfully
            </Typography>
            <Typography component="h1" variant="h6">
              A reset password link has been sent to
            </Typography>
            <Typography component="h1" variant="h6">
              {email}
            </Typography>
            <Button
              onClick={backToSignIn}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back to Sign in
            </Button>
          </Box>
          <CopyRight />
        </>
      )}
    </Container>
  );
};

export const ForgotPasswordScreen = () => {
  return (
    <AuthenticationRedirect>
      <ForgotPassword />
    </AuthenticationRedirect>
  );
};
