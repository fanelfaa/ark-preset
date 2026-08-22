class CustomCodeBlock extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const pre = this.querySelector("pre");
    if (!pre) return;

    // Actions container (buttons)
    const actions = document.createElement("div");
    actions.className = "absolute top-2 right-2 flex gap-2 z-10";

    // Copy button
    const copyBtn = document.createElement("button");
    copyBtn.className =
      "copy-btn p-1.5 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-zinc-700";
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
    `;
    copyBtn.setAttribute("aria-label", "Copy code");
    copyBtn.setAttribute("title", "Copy code");
    copyBtn.addEventListener("click", async () => {
      const code = pre.textContent || "";
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          `;
        }, 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    });

    actions.appendChild(copyBtn);
    this.appendChild(actions);

    // Add group class for hover effects
    this.classList.add("group");

    // Check if expandable
    requestAnimationFrame(() => {
      // scrollHeight gives the total height of the content.
      // If it's less than or equal to 200, we don't need to expand.
      if (pre.scrollHeight > 200) {
        // Fade overlay
        const fade = document.createElement("div");
        fade.className =
          "fade-overlay absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(var(--background))] to-transparent pointer-events-none transition-opacity duration-300";
        this.appendChild(fade);

        // Expand button
        const expandBtn = document.createElement("button");
        expandBtn.className =
          "expand-btn w-full py-2 text-sm font-medium border-t border-border bg-muted/50 hover:bg-muted transition-colors cursor-pointer text-center relative z-10";
        expandBtn.textContent = "Show more";

        let isExpanded = false;

        expandBtn.addEventListener("click", () => {
          isExpanded = !isExpanded;
          if (isExpanded) {
            this.classList.add("expanded");
            fade.style.opacity = "0";
            expandBtn.textContent = "Show less";
          } else {
            this.classList.remove("expanded");
            fade.style.opacity = "1";
            expandBtn.textContent = "Show more";
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
