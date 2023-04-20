import React from "react";
import { Screens } from "./components/screens";
import { ThemeProvider } from "./providers/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <Screens />
    </ThemeProvider>
  );
};

export default App;
