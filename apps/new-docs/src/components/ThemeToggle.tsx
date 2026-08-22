import { createSignal, onMount } from "solid-js";

const STORAGE_KEY = "ui-theme";

function getSystemPref(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStored(): "dark" | "light" | null {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "dark" || val === "light") return val;
  } catch {}
  return null;
}

function resolveTheme(): "dark" | "light" {
  return getStored() ?? getSystemPref();
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [isDark, setIsDark] = createSignal(resolveTheme() === "dark");

  onMount(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (getStored() === null) {
        const dark = mql.matches;
        setIsDark(dark);
        applyTheme(dark ? "dark" : "light");
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  });

  const toggle = (e: MouseEvent) => {
    const next = !isDark();
    const nextTheme = next ? "dark" : "light";
    const x = e.clientX;
    const y = e.clientY;
    const maxR = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const cb = () => {
      setIsDark(next);
      applyTheme(nextTheme);
    };
    try {
      if (document.startViewTransition) {
        const root = document.documentElement;
        root.style.setProperty("--vt-x", `${x}px`);
        root.style.setProperty("--vt-y", `${y}px`);
        root.style.setProperty("--vt-r", `${maxR}px`);
        const vt = document.startViewTransition(cb);
        vt.finished.then(() => {
          root.style.removeProperty("--vt-x");
          root.style.removeProperty("--vt-y");
          root.style.removeProperty("--vt-r");
        });
      } else {
        cb();
      }
    } catch {
      cb();
    }
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      aria-label={isDark() ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark() ? (
        /* Sun icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        /* Moon icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
