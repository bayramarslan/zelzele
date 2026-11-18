"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#18181b"
} as const;

export default function ThemeColor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const color =
      resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach(el => el.remove());

    const meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", color);
    document.head.appendChild(meta);
  }, [mounted, resolvedTheme]);

  return null;
}
