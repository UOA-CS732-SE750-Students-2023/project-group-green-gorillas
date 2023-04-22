import React, { useCallback, useMemo, useState } from "react";
import { AuthenticationRedirect } from "../utils/AuthenticationRedirect";
import {
  Box,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { CopyRight } from "../../common/CopyRight";
import { useSignIn } from "../../../hooks/useSignIn";
import { ScreenPath } from "../index";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const LOGIN_REMEMBER_ME_STORAGE_KEY = "rememberMe";

const Login = () => {
  const { storageValue, setStorageValue } = useLocalStorage(
    LOGIN_REMEMBER_ME_STORAGE_KEY
  );

  const isRememberedMe = useMemo(() => {
    return storageValue === "true";
  }, [storageValue]);

  const onIsRememberMeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;

      setStorageValue(isChecked.toString());
    },
    []
  );

  const { onSignIn, error, isLoading } = useSignIn();

  const onHandleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);

      await onSignIn(
        data.get("email") as string,
        data.get("password") as string,
        isRememberedMe
      );
    },
    []
  );

  return (
    <Container component="main" maxWidth="xs">
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
          <LockOutlined />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={onIsRememberMeChange}
                checked={isRememberedMe}
                value="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Loading ..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={ScreenPath.ForgotPassword} variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CopyRight />
    </Container>
  );
};

export const LoginScreen = () => {
  return (
    <AuthenticationRedirect>
      <Login />
    </AuthenticationRedirect>
  );
};
