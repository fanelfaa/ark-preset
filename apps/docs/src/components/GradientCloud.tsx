import { onCleanup, onMount } from "solid-js";

const STYLE_ID = "gradient-cloud-styles";
const CONTAINER_ID = "gradient-cloud";

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
  let container: HTMLDivElement | undefined;

  onMount(() => {
    if (typeof document === "undefined") return;
    if (!document.getElementById(STYLE_ID)) {
      const s = document.createElement("style");
      s.id = STYLE_ID;
      s.textContent = `
@keyframes cloud-a { 0%{translate:0 0} 25%{translate:18vw -10vh} 50%{translate:35vw 5vh} 75%{translate:12vw -5vh} 100%{translate:0 0} }
@keyframes cloud-b { 0%{translate:0 0} 33%{translate:-12vw 8vh} 66%{translate:-28vw -7vh} 100%{translate:0 0} }
@keyframes cloud-c { 0%{translate:0 0} 50%{translate:22vw 12vh} 100%{translate:0 0} }
`;
      document.head.appendChild(s);
    }

    const div = document.createElement("div");
    div.id = CONTAINER_ID;
    div.style.cssText = "position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none";

    const refs: HTMLDivElement[] = [];
    const isDark = document.documentElement.classList.contains("dark");

    for (const b of BLOBS) {
      const blob = document.createElement("div");
      blob.dataset.blobIdx = String(refs.length);
      applyBlobStyle(blob, b, isDark);
      div.appendChild(blob);
      refs.push(blob);
    }

    document.body.appendChild(div);
    container = div;

    // Theme observer
    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      for (let i = 0; i < refs.length; i++) {
        applyBlobStyle(refs[i], BLOBS[i], dark);
      }
    };
    const obs = new MutationObserver(updateTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Mouse parallax
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      for (const el of refs) {
        el.style.setProperty("--px", `${x * 18}px`);
        el.style.setProperty("--py", `${y * 18}px`);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    onCleanup(() => {
      obs.disconnect();
      window.removeEventListener("mousemove", onMove);
      div.remove();
    });
  });

  return <div ref={container} style="display:none" />;
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
