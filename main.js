/* Paly AI Labs — motion + interaction (v2)
   Sequence (t = 0 at `go`), timings measured from the reference:
     0     hairlines draw (top, bottom, left, right: 0/55/110/200ms, 460ms quart in-out)
     130   hero title letters rise out of slots (30ms stagger, 800ms quart out)
     700   hero image opens from a centre seam (1300ms quart in-out)
     1175  caption panel wipes in from top-left (850ms)
     1820  header bar + edge frame slide in over the image (900ms); caption words rise
     2470  logo, then nav items rise out of slots */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const EASE = "cubic-bezier(.76,0,.24,1)";
  const store = {
    get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };

  /* ───────── text splitting ───────── */
  // Every letter gets a masked slot so it can rise out of an overflow:hidden edge.
  function splitText(el) {
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span");
            w.className = "w"; w.setAttribute("aria-hidden", "true");
            [...tok].forEach((c) => {
              const m = document.createElement("span"); m.className = "m";
              const l = document.createElement("span"); l.className = "ltr";
              l.style.setProperty("--i", i++); l.textContent = c;
              m.appendChild(l); w.appendChild(m);
            });
            frag.appendChild(w);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && !ch.hasAttribute("data-nosplit")) {
          // a mark that lives inside a title already carries its own .ltr; count it so letters stagger after it
          if (ch.classList.contains("mk")) { i++; return; }
          walk(ch);
        }
      });
    };
    walk(el);
    return i;
  }

  // Body copy: words rise 28px and fade. A <mark> travels with its word (colour is never "already there").
  function splitWords(el) {
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    let i = 0;
    [...el.childNodes].forEach((ch) => {
      const wrap = (node) => { const s = document.createElement("span"); s.className = "iw"; s.setAttribute("aria-hidden", "true"); s.style.setProperty("--i", i++); s.appendChild(node); return s; };
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach((tok) => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(" ")); return; }
          frag.appendChild(wrap(document.createTextNode(tok)));
        });
        el.replaceChild(frag, ch);
      } else if (ch.nodeType === 1) {
        el.replaceChild(wrap(ch.cloneNode(true)), ch);
      }
    });
  }

  // Per-letter roll: each letter has a lime twin below it that slides up on hover.
  function rollText(el) {
    const t = el.textContent;
    el.textContent = "";
    el.setAttribute("aria-label", t);
    [...t].forEach((c, i) => {
      const s = document.createElement("span");
      s.className = "r"; s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--d", i * 25 + "ms");
      const a = document.createElement("b"); a.textContent = c === " " ? " " : c;
      const b = document.createElement("b"); b.className = "rn"; b.textContent = a.textContent;
      s.append(a, b); el.appendChild(s);
    });
  }

  $$("[data-split]").forEach(splitText);
  $$("[data-words]").forEach(splitWords);
  $$("[data-roll]").forEach(rollText);

  /* ───────── preloader: tagline words conveyed top → bottom ───────── */
  const pre = $("#pre");
  if (pre) {
    const line = $(".pre-line", pre);
    const words = line.textContent.trim().split(/\s+/);
    line.setAttribute("aria-label", words.join(" "));
    line.textContent = "";
    words.forEach((w, i) => {
      const pw = document.createElement("span"); pw.className = "pw"; pw.setAttribute("aria-hidden", "true");
      const pi = document.createElement("span"); pi.className = "pi"; pi.style.setProperty("--i", i); pi.textContent = w;
      pw.appendChild(pi); line.appendChild(pw);
    });
  }

  /* ───────── orchestration ───────── */
  const cur = $("#curtain");
  const SLANT_HIDE = "polygon(0 130%, 100% 100%, 100% 100%, 0 100%)";
  const COVER = "polygon(0 0, 100% -30%, 100% 100%, 0 100%)";
  const FULL_A = "polygon(0 0, 100% 0, 100% 100%, 0 130%)";
  const FULL_B = "polygon(0 0, 100% 0, 100% -30%, 0 0)";

  function go() { root.classList.add("go", "ready"); }

  function lift() {
    if (!cur || RM) { go(); return; }
    const a = cur.animate([{ clipPath: FULL_A }, { clipPath: FULL_B }], { duration: 1150, easing: EASE, fill: "forwards" });
    setTimeout(go, 420);
    const done = () => { root.classList.remove("covered"); cur.style.pointerEvents = "none"; a.cancel(); };
    a.onfinish = done;
    setTimeout(done, 1300); // fallback if animation callbacks stall in a backgrounded tab
  }

  function runPreloader() {
    // in: 150ms → words drop in 100ms apart (730ms expo out); hold; out: words exit downward (450ms, 45ms apart)
    setTimeout(() => root.classList.add("pre-in"), 150);
    setTimeout(() => root.classList.add("pre-out"), 2250);
    setTimeout(() => { root.classList.remove("pre"); go(); }, 3150);
  }

  if (RM) go();
  else if (root.classList.contains("pre")) runPreloader();
  else if (root.classList.contains("covered")) setTimeout(lift, 180);
  else setTimeout(go, 30);
  store.set("paly-seen", "1");

  // Internal links cover the screen with the slanted wipe, then navigate.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || !cur || RM || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute("href");
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
    e.preventDefault();
    store.set("paly-nav", "1");
    cur.style.pointerEvents = "all";
    cur.getAnimations().forEach((x) => x.cancel());
    const anim = cur.animate([{ clipPath: SLANT_HIDE }, { clipPath: COVER }], { duration: 800, easing: EASE, fill: "forwards" });
    let gone = false;
    const leave = () => { if (!gone) { gone = true; location.href = a.href; } };
    anim.onfinish = leave;
    setTimeout(leave, 1000);
  });
  addEventListener("pageshow", (e) => {
    if (e.persisted && cur) { cur.getAnimations().forEach((x) => x.cancel()); cur.style.clipPath = SLANT_HIDE; cur.style.pointerEvents = "none"; go(); }
  });

  /* ───────── reveal on scroll ───────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  $$("[data-split]:not([data-scrub]), [data-reveal], .sec-h").forEach((el) => io.observe(el));

  /* ───────── isometric scene ───────── */
  function buildIso(svg) {
    const S = 21, C = Math.cos(Math.PI / 6);
    const P = (x, y, z) => [(x - y) * C * S, (x + y) * 0.5 * S - z * S];
    const f = (n) => n.toFixed(1);
    const pts = (a) => a.map((p) => P(...p).map(f).join(",")).join(" ");
    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const shade = (h, k) => "#" + hex(h).map((v) => clamp(Math.round(v * k), 0, 255).toString(16).padStart(2, "0")).join("");
    const poly = (p, fill, stroke = "none", sw = 1, extra = "") =>
      `<polygon points="${pts(p)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" ${extra}/>`;
    const ST = "rgba(0,0,0,.3)";
    const box = (x, y, z, w, d, h, c) =>
      poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], shade(c, 1.12), ST, 0.8) +
      poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], shade(c, 0.82), ST, 0.8) +
      poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], shade(c, 0.58), ST, 0.8);
    const line = (a, b, st, dash = "") => {
      const [x1, y1] = P(...a), [x2, y2] = P(...b);
      return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${st}" stroke-width=".8" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
    };
    const label = (x, y, z, t) => { const [px, py] = P(x, y, z); return `<text x="${f(px)}" y="${f(py)}">${t}</text>`; };
    let seed = 7;
    const rng = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

    const ZT = 11, N = 14, T = 12 / N;
    let out = "";
    out += box(0, 0, 0, 12, 12, 0.5, "#122017");
    for (let gx = 0; gx < 3; gx++) for (let gy = 0; gy < 3; gy++) {
      const x = 1 + gx * 3.7, y = 1 + gy * 3.7, s = 2.7;
      out += poly([[x, y, 0.5], [x + s, y, 0.5], [x + s, y + s, 0.5], [x, y + s, 0.5]], "none", "rgba(238,244,236,.2)", 0.7);
    }
    [[0, 0], [12, 0], [12, 12], [0, 12]].forEach(([x, y]) => { out += line([x, y, 0.5], [x, y, ZT], "rgba(238,244,236,.16)", "3 3"); });
    out += `<g class="grp" data-g="2"><g class="blk" style="--k:2">${box(1.1, 8, 0.5, 3, 3, 1.2, "#0f6712")}${box(1.5, 8.4, 1.7, 2.2, 2.2, 1.2, "#2fbf3a")}${box(2, 8.9, 2.9, 1.2, 1.2, 0.7, "#c6f432")}</g><g class="blk" style="--k:3">${box(8.4, 1.2, 0.5, 1.6, 1.6, 1.6, "#e9f7e4")}</g></g>`;
    out += `<g class="grp" data-g="3"><g class="blk" style="--k:4">${box(5.4, 5.4, 0.5, 1.5, 1.5, 3.4, "#e9f7e4")}${box(5.65, 5.65, 3.9, 1, 1, 0.55, "#0f6712")}</g></g>`;
    let bars = "";
    for (let i = 0; i < 6; i++) bars += `<g class="blk" style="--k:${5 + i}">${box(7 + i * 0.72, 8, 0.5, 0.5, 3, 1.1 + i * 0.55, i % 2 ? "#c6f432" : "#a6e22e")}</g>`;
    out += `<g class="grp" data-g="1">${bars}</g>`;
    let tiles = "";
    const pal = ["#ffffff", "#4be25a", "#c6f432", "#0f6712", "#1d3b22", "#e9f7e4", "#f4d03f", "#2fbf3a"];
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const r = rng(); if (r < 0.3) continue;
      const c = pal[Math.floor(rng() * pal.length)], x = i * T + 0.07, y = j * T + 0.07, s = T - 0.14;
      tiles += poly([[x, y, ZT + 0.4], [x + s, y, ZT + 0.4], [x + s, y + s, ZT + 0.4], [x, y + s, ZT + 0.4]], c);
    }
    out += `<g class="grp" data-g="0"><g class="float"><g class="blk" style="--k:0">${box(0, 0, ZT, 12, 12, 0.4, "#16241a")}${tiles}${box(0.4, 0.4, ZT + 0.4, 1.8, 1.8, 0.9, "#0f6712")}${box(9.6, 9.6, ZT + 0.4, 1.6, 1.6, 0.5, "#4be25a")}${label(-5.2, 5.6, ZT + 0.4, "PALY.01 0.78")}${label(8.4, 13.4, 0.5, "ROOM.549")}</g></g></g>`;
    svg.innerHTML = out;
    const bb = svg.getBBox(), pad = 16;
    svg.setAttribute("viewBox", `${f(bb.x - pad)} ${f(bb.y - pad)} ${f(bb.width + pad * 2)} ${f(bb.height + pad * 2 + 8)}`);
  }

  /* ───────── scroll-pinned feature section ───────── */
  const feature = $("#feature");
  if (feature) {
    const iso = $("#iso");
    buildIso(iso);
    const groups = {}; $$(".grp", iso).forEach((g) => (groups[g.dataset.g] = g));
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { iso.classList.add("in"); o.disconnect(); } }, { threshold: 0.2 }).observe(iso);

    const sticky = $(".feature-sticky", feature);
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { sticky.classList.add("in"); o.disconnect(); } }, { threshold: 0.25 }).observe(sticky);

    const items = $$(".acc-item", feature);
    items.forEach((it, k) => it.style.setProperty("--k", k));
    const head = $("h2", feature);
    const letters = $$(".ltr", head);
    const desktop = matchMedia("(min-width: 900px)");
    const rail = $(".rail", feature);
    let active = -1;
    const setActive = (i) => {
      if (i === active) return; active = i;
      items.forEach((it, k) => { it.classList.toggle("on", k === i); it.dataset.d = Math.abs(k - i); });
      Object.entries(groups).forEach(([k, g]) => { g.classList.toggle("hot", +k === i); g.classList.toggle("dim", +k !== i); });
    };
    const total = () => feature.offsetHeight - (innerHeight - 64);
    const update = () => {
      const r = feature.getBoundingClientRect(), vh = innerHeight;
      // heading letters scrubbed by scroll: rise and un-rotate (-14° → 0, like the reference)
      const hp = RM ? 1 : clamp((vh * 0.95 - r.top) / (vh * 0.55));
      const n = letters.length;
      letters.forEach((l, i) => {
        const t = clamp(hp * 1.9 - (i / n) * 0.9), e = 1 - Math.pow(1 - t, 4);
        l.style.transform = e >= 1 ? "none" : `translateY(${(1 - e) * 115}%) rotate(${-(1 - e) * 14}deg)`;
      });
      if (desktop.matches) {
        const p = clamp((64 - r.top) / total());
        rail.style.setProperty("--p", p.toFixed(4));
        setActive(Math.min(items.length - 1, Math.floor(p * items.length)));
      } else {
        rail.style.setProperty("--p", 0);
        active = -2; items.forEach((it) => it.classList.add("on"));
        Object.values(groups).forEach((g) => g.classList.remove("hot", "dim"));
      }
    };
    let tick = false;
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; update(); }); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", () => { active = -1; update(); });
    update();

    items.forEach((it, i) => $("button", it).addEventListener("click", () => {
      if (!desktop.matches) return;
      const top = feature.getBoundingClientRect().top + scrollY - 64 + ((i + 0.06) / items.length) * total();
      scrollTo({ top, behavior: RM ? "auto" : "smooth" });
    }));

    // gentle pointer parallax on the diagram
    if (!RM) {
      const stage = $(".f-right", feature);
      let tx = 0, ty = 0, cx = 0, cy = 0;
      stage.addEventListener("pointermove", (e) => {
        const b = stage.getBoundingClientRect();
        tx = ((e.clientX - b.left) / b.width - 0.5) * 18; ty = ((e.clientY - b.top) / b.height - 0.5) * 12;
      });
      stage.addEventListener("pointerleave", () => { tx = ty = 0; });
      (function loop() { cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07; iso.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`; requestAnimationFrame(loop); })();
    }
  }
})();
