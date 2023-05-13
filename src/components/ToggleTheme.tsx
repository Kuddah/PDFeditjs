import React from "react";
import { useTheme } from "../services/theme";

const ToggleTheme: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
    </button>
  );
};

export default ToggleTheme;
