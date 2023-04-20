import React from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";

type Props = {
  children: JSX.Element;
};

const theme = createTheme({});

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
