import React from "react";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Screens } from "./components/screens";
import { ThemeProvider } from "./providers/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <StyledEngineProvider injectFirst>
        <Screens />
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
