"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#18181b"
} as const;

export default function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color =
      resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    let meta = document.querySelector(
      'meta[name="theme-color"]:not([media])'
    ) as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }

    document
      .querySelectorAll('meta[name="theme-color"][media]')
      .forEach(el => el.remove());

    meta.setAttribute("content", color);
  }, [resolvedTheme]);

  return null;
}
