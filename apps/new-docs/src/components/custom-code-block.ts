class CustomCodeBlock extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const pre = this.querySelector("pre");
    if (!pre) return;

    // Copy button (matches old CodeBlock.tsx)
    const copyBtn = document.createElement("button");
    copyBtn.className =
      "absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-background/30 transition-colors cursor-pointer z-10";
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    `;
    copyBtn.setAttribute("aria-label", "Copy code");
    copyBtn.setAttribute("title", "Copy code");
    copyBtn.addEventListener("click", async () => {
      const code = pre.textContent || "";
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(code);
        } else {
          // Fallback for non-secure contexts (e.g. testing over local IP)
          const textarea = document.createElement("textarea");
          textarea.value = code;
          textarea.style.position = "absolute";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          `;
        }, 1500);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    });

    this.appendChild(copyBtn);

    // Check if expandable
    requestAnimationFrame(() => {
      // scrollHeight gives the total height of the content.
      // If it's less than or equal to 200, we don't need to expand.
      if (pre.scrollHeight > 200) {
        // Fade overlay
        const fade = document.createElement("div");
        fade.className =
          "fade-overlay pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-background/10 backdrop-blur-[2px] transition-opacity duration-300";
        this.appendChild(fade);

        // Expand button (matches Button variant="outline" size="sm")
        const expandBtn = document.createElement("button");
        expandBtn.className =
          "expand-btn absolute bottom-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0.5 active:duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-2.5 text-sm";
        expandBtn.textContent = "Show more";

        let isExpanded = false;

        // Set initial explicit maxHeight for CSS transition
        pre.style.maxHeight = "200px";

        expandBtn.addEventListener("click", () => {
          isExpanded = !isExpanded;
          if (isExpanded) {
            this.classList.add("expanded");
            fade.style.opacity = "0";
            expandBtn.textContent = "Show less";
            pre.style.paddingBottom = "52px";
            // Set explicit px value so CSS can animate it smoothly
            pre.style.maxHeight = (pre.scrollHeight + 52) + "px";
          } else {
            this.classList.remove("expanded");
            fade.style.opacity = "1";
            expandBtn.textContent = "Show more";
            pre.style.paddingBottom = "1rem";
            pre.style.maxHeight = "200px";
          }
        });

        this.appendChild(expandBtn);
      } else {
        // It's small, so we don't need max-height constraint
        this.classList.add("expanded"); // effectively removes max-height from pre
      }
    });
  }
}

if (typeof window !== "undefined" && !customElements.get("custom-code-block")) {
  customElements.define("custom-code-block", CustomCodeBlock);
}
