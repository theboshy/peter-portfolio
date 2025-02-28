import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  return { isDark, setIsDark };
}
