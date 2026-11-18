"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cx } from "@/lib/utils";
import store from "@/stores/list";

export default function Filter() {
  const { setFilter, fetchData, filter, loading } = store();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? theme : "system";

  const cycleTheme = () => {
    if (theme === "system") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else setTheme("system");
  };

  const themeLabel =
    currentTheme === "system"
      ? "Sistem"
      : currentTheme === "dark"
      ? "Koyu"
      : "Açık";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-gradient-to-t from-zinc-400 pb-10 pt-20 dark:from-zinc-800">
      {/* container */}
      <div className="flex flex-nowrap items-center justify-center gap-3">
        {/* city */}
        {filter?.city && (
          <button
            className="flex h-12 w-28 select-none items-center gap-1.5 rounded-full bg-white px-4
            font-semibold shadow-lg dark:bg-zinc-900 dark:text-zinc-100 md:w-auto"
            onClick={() =>
              setFilter({
                ...filter,
                city: null
              })
            }
          >
            <span className="grow overflow-hidden text-ellipsis">
              {filter.city.replace(/ /g, "\u00a0")}
            </span>
            <svg
              className="-mr-1 shrink-0 opacity-50"
              width="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* filter */}
        <div className="flex h-12 items-center rounded-full bg-white p-1 shadow-lg dark:bg-zinc-900">
          {[1, 4].map(i => {
            const isSelected = filter.hide === i;

            return (
              <button
                key={i}
                type="button"
                aria-label={
                  i === 1 ? "Tümünü göster" : `${i} den büyükleri göster`
                }
                className={cx(
                  "relative inline-flex h-full cursor-pointer select-none items-center",
                  "rounded-full px-4 font-medium transition-all",
                  isSelected &&
                    "bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900"
                )}
                onClick={() =>
                  setFilter({
                    ...filter,
                    hide: i
                  })
                }
              >
                <span className={cx("relative z-10 inline-flex items-center")}>
                  {i !== 1 && (
                    <svg
                      className="-ml-1.5 -mr-1 opacity-50"
                      width="20"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  )}
                  <span>{i === 1 ? "Tümü" : i}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* refresh */}
        <button
          className="flex h-12 w-12 shrink-0 cursor-pointer rounded-full bg-white p-1 shadow-lg dark:bg-zinc-900"
          onClick={fetchData}
          aria-label="Yenile"
        >
          <span
            className={cx(
              "flex h-full w-full items-center justify-center rounded-full transition-all",
              loading &&
                "animate-spin bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900"
            )}
            style={{
              animationDirection: "reverse"
            }}
          >
            <svg
              width="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
          </span>
        </button>

        {/* theme */}
        <button
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white p-1 shadow-lg dark:bg-zinc-900"
          onClick={cycleTheme}
          aria-label={`Tema: ${themeLabel}`}
          title={`Tema: ${themeLabel}`}
        >
          {currentTheme === "system" ? (
            <svg
              width="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="12" rx="2" />
              <line x1="7" y1="20" x2="17" y2="20" />
              <line x1="9" y1="16" x2="9" y2="20" />
              <line x1="15" y1="16" x2="15" y2="20" />
            </svg>
          ) : currentTheme === "dark" ? (
            <svg
              width="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            </svg>
          ) : (
            <svg
              width="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
