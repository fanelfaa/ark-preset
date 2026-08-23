import { onCleanup, onMount } from "solid-js";

const STYLE_ID = "gradient-cloud-styles";
const CONTAINER_ID = "gradient-cloud";
const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface BlobConfig {
  w: string;
  h: string;
  l: string;
  t: string;
  a: string;
  light: string;
  dark: string;
}

const BLOBS: BlobConfig[] = [
  {
    w: "700px",
    h: "700px",
    l: "-10%",
    t: "-10%",
    a: "cloud-a 25s ease-in-out infinite",
    light: "rgba(193,99,63,0.5)",
    dark: "rgba(193,99,63,0.30)",
  },
  {
    w: "600px",
    h: "600px",
    l: "55%",
    t: "25%",
    a: "cloud-b 30s ease-in-out infinite",
    light: "rgba(59,130,246,0.45)",
    dark: "rgba(59,130,246,0.25)",
  },
  {
    w: "500px",
    h: "500px",
    l: "25%",
    t: "-5%",
    a: "cloud-c 20s ease-in-out infinite",
    light: "rgba(236,72,153,0.4)",
    dark: "rgba(236,72,153,0.22)",
  },
  {
    w: "400px",
    h: "400px",
    l: "70%",
    t: "55%",
    a: "cloud-a 35s ease-in-out infinite",
    light: "rgba(52,211,153,0.35)",
    dark: "rgba(52,211,153,0.18)",
  },
];

export function GradientCloud() {
  onMount(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let div: HTMLDivElement | undefined;
    let refs: HTMLDivElement[] = [];
    let obs: MutationObserver | undefined;
    let onMove: ((e: MouseEvent) => void) | undefined;
    let fadeTimer: number | undefined;
    let fadeEl: HTMLDivElement | undefined;

    // Cancel a pending fade-out and remove its element so nothing lingers
    const clearFade = () => {
      if (fadeTimer !== undefined) {
        window.clearTimeout(fadeTimer);
        fadeTimer = undefined;
        fadeEl?.remove();
        fadeEl = undefined;
      }
    };

    const teardown = (fade = true) => {
      if (!div) return;
      clearFade();
      const el = div;
      div = undefined;
      refs = [];
      obs?.disconnect();
      obs = undefined;
      if (onMove) window.removeEventListener("mousemove", onMove);
      onMove = undefined;
      if (fade) {
        el.style.animation = "cloud-fade-out 1s ease-in forwards";
        fadeEl = el;
        fadeTimer = window.setTimeout(() => {
          fadeTimer = undefined;
          fadeEl = undefined;
          el.remove();
        }, 1000);
      } else {
        el.remove();
      }
    };

    const mount = () => {
      if (div) return; // already mounted

      if (!document.getElementById(STYLE_ID)) {
        const s = document.createElement("style");
        s.id = STYLE_ID;
        s.textContent = `
@keyframes cloud-a { 0%{translate:0 0} 25%{translate:18vw -10vh} 50%{translate:35vw 5vh} 75%{translate:12vw -5vh} 100%{translate:0 0} }
@keyframes cloud-b { 0%{translate:0 0} 33%{translate:-12vw 8vh} 66%{translate:-28vw -7vh} 100%{translate:0 0} }
@keyframes cloud-c { 0%{translate:0 0} 50%{translate:22vw 12vh} 100%{translate:0 0} }
@keyframes cloud-fade-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes cloud-fade-out { from { opacity: 1 } to { opacity: 0 } }
`;
        document.head.appendChild(s);
      }

      div = document.createElement("div");
      div.id = CONTAINER_ID;
      div.setAttribute("aria-hidden", "true");
      div.style.cssText =
        "position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;animation:cloud-fade-in 1s ease-out";

      const isDark = document.documentElement.classList.contains("dark");
      refs = [];
      for (const b of BLOBS) {
        const blob = document.createElement("div");
        blob.dataset.blobIdx = String(refs.length);
        applyBlobStyle(blob, b, isDark);
        div.appendChild(blob);
        refs.push(blob);
      }

      document.body.appendChild(div);

      // Theme observer
      const updateTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        for (let i = 0; i < refs.length; i++) {
          applyBlobStyle(refs[i], BLOBS[i], dark);
        }
      };
      obs = new MutationObserver(updateTheme);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      // Mouse parallax
      onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        for (const el of refs) {
          el.style.setProperty("--px", `${x * 18}px`);
          el.style.setProperty("--py", `${y * 18}px`);
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });
    };

    // Mount only on desktop when the user hasn't requested reduced motion
    const update = () => {
      if (reducedMotion.matches)
        teardown(false); // never animate for a11y
      else if (mobile.matches) teardown();
      else mount();
    };
    update();

    mobile.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    onCleanup(() => {
      mobile.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      clearFade();
      teardown(false);
    });
  });

  return <div style="display:none" />;
}

function applyBlobStyle(el: HTMLDivElement, cfg: BlobConfig, dark: boolean) {
  const color = dark ? cfg.dark : cfg.light;
  el.style.cssText = [
    "position:absolute",
    `width:${cfg.w}`,
    `height:${cfg.h}`,
    `left:${cfg.l}`,
    `top:${cfg.t}`,
    `background:radial-gradient(circle,${color},transparent 70%)`,
    `animation:${cfg.a}`,
    "transform:translate(var(--px,0),var(--py,0))",
    "border-radius:50%",
    "filter:blur(100px)",
  ].join(";");
}
