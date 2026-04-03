"use client";

import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-lg bg-emerald-500 px-4 py-2 text-white"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ToggleTheme;
