/* Paly AI Labs — custom cursor ("blueprint marker")
   Reference behaviour (stanfordai.club): only for (hover:hover) and (pointer:fine); native cursor hidden once
   ready; a 12px rounded square, mix-blend difference, positioned with zero latency; fades in on first move.
   Paly flare on top of that:
     · an isometric diamond tile trails the core with a spring (the 30° geometry of the P mark)
     · links/buttons: tile swells and fills lime, core shrinks, a tag shows → or ↗ (or data-cursor text)
     · [data-cursor-zone="coords"]: tag becomes a live blueprint readout, X 0412 · Y 0288 (off by default, see CONFIG)
     · press squeezes the marker; click sprays a few mosaic pixels */
(() => {
  const CONFIG = {
    coords: false, // set true to show the live X/Y readout (and dashed tile) inside [data-cursor-zone="coords"] areas
  };

  const FINE = matchMedia("(hover: hover) and (pointer: fine)");
  if (!FINE.matches) return;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  const el = (cls) => { const d = document.createElement("div"); d.className = cls; d.setAttribute("aria-hidden", "true"); return d; };
  const core = el("cx"); core.appendChild(document.createElement("i")).className = "cx-core";
  const halo = el("cx-halo"); halo.appendChild(document.createElement("i"));
  const tag = el("cx-tag");
  const fx = el("cx-fx");
  document.body.append(halo, tag, fx, core);

  const INTERACTIVE = "a[href], button, [data-cursor], summary, [role='button']";
  let tx = -100, ty = -100;       // pointer target (core is placed here with no easing)
  let hx = -100, hy = -100;       // trailing tile position
  let hs = 1, hsT = 1;            // tile scale (eased)
  let shown = false, ready = false, text = "", lastEl = null;

  const state = { link: false, coords: false, down: false };
  const setClass = (k, on) => { if (state[k] !== on) { state[k] = on; root.classList.toggle("cx-" + k, on); } };
  const setTag = (t) => { if (t !== text) { text = t; tag.textContent = t; } root.classList.toggle("cx-tagged", !!t); };

  const pad = (n) => String(Math.max(0, Math.round(n))).padStart(4, "0");

  function describe(target) {
    const it = target && target.closest ? target.closest(INTERACTIVE) : null;
    const zone = target && target.closest ? target.closest("[data-cursor-zone]") : null;
    setClass("link", !!it);
    setClass("coords", CONFIG.coords && !it && !!zone && zone.dataset.cursorZone === "coords");
    if (it) {
      const custom = it.dataset.cursor;
      const ext = it.tagName === "A" && (it.target === "_blank" || /^(https?:|mailto:)/.test(it.getAttribute("href") || ""));
      setTag(custom || (it.tagName === "BUTTON" ? "Open" : ext ? "↗" : "→"));
    } else if (!state.coords) setTag("");
    hsT = it ? 1.55 : state.down ? 0.8 : 1;
  }

  function move(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    tx = e.clientX; ty = e.clientY;
    core.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    if (!shown) { shown = true; hx = tx; hy = ty; root.classList.add("cx-on"); }
    if (e.target !== lastEl) { lastEl = e.target; describe(e.target); }
    if (state.coords) setTag(`X ${pad(tx)} · Y ${pad(ty)}`);
  }

  function frame() {
    const k = RM ? 1 : 0.17;
    const dx = tx - hx, dy = ty - hy;
    hx += dx * k; hy += dy * k;
    hs += (hsT - hs) * (RM ? 1 : 0.16);
    // the tile breathes with speed, then settles
    const speed = RM ? 0 : Math.min(Math.hypot(dx, dy) / 90, 0.3);
    halo.style.transform = `translate3d(${hx.toFixed(2)}px,${hy.toFixed(2)}px,0) scaleY(.5774) rotate(45deg) scale(${(hs + speed).toFixed(3)})`;
    tag.style.transform = `translate3d(${(hx + 22).toFixed(2)}px,${(hy + 16).toFixed(2)}px,0)`;
    requestAnimationFrame(frame);
  }

  // mosaic-pixel burst on click
  const COLORS = ["#4be25a", "#c6f432", "#ffffff", "#0f6712", "#2fbf3a"];
  function burst(x, y) {
    if (RM) return;
    for (let i = 0; i < 7; i++) {
      const p = document.createElement("i");
      const s = 3 + Math.random() * 4;
      p.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${COLORS[i % COLORS.length]}`;
      fx.appendChild(p);
      const a = (i / 7) * Math.PI * 2 + Math.random() * 0.7, d = 26 + Math.random() * 38;
      const an = p.animate(
        [{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
         { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d * 0.62}px)) rotate(${(Math.random() - 0.5) * 120}deg) scale(0.2)`, opacity: 0 }],
        { duration: 650 + Math.random() * 250, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" });
      const rm = () => p.remove();
      an.onfinish = rm; setTimeout(rm, 1400);
    }
  }

  addEventListener("pointermove", move, { passive: true });
  addEventListener("pointerdown", (e) => { if (e.button === 0 && (!e.pointerType || e.pointerType === "mouse")) { setClass("down", true); hsT = state.link ? 1.3 : 0.8; } });
  addEventListener("pointerup", () => { setClass("down", false); hsT = state.link ? 1.55 : 1; });
  addEventListener("click", (e) => { if (shown && (!e.pointerType || e.pointerType === "mouse")) burst(e.clientX, e.clientY); });
  addEventListener("scroll", () => { if (shown) requestAnimationFrame(() => { const t = document.elementFromPoint(tx, ty); lastEl = t; describe(t); }); }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => root.classList.remove("cx-on"));
  document.documentElement.addEventListener("pointerenter", () => { if (shown) root.classList.add("cx-on"); });
  addEventListener("blur", () => root.classList.remove("cx-on"));

  // like the reference: the native cursor only disappears once the page has finished its intro
  function enable() {
    if (ready) return; ready = true;
    root.classList.add("cursor-ready");
    requestAnimationFrame(frame);
  }
  if (root.classList.contains("go")) enable();
  else {
    const mo = new MutationObserver(() => { if (root.classList.contains("go")) { mo.disconnect(); enable(); } });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    setTimeout(enable, 8000);
  }
})();
