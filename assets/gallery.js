"use strict";
(() => {
  const toolbar = document.querySelector(".toolbar");
  const cards = [...document.querySelectorAll(".card")];
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const allButton = document.querySelector("#motion-all");
  const theme = document.querySelector("#theme");
  const live = document.querySelector("#live-count");
  const reduced = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
  const nav = document.documentElement;
  const canObserve = typeof IntersectionObserver === "function";
  let chosen = "all";
  let globalPlay = false;
  let dark = false;
  const visible = new Set();
  const overrides = new Map();
  const current = new WeakMap();

  function active(card, next) {
    if (current.get(card) === next) return;
    const button = card.querySelector("[data-motion]");
    const image = button.querySelector("img");
    const title = card.querySelector("h2").textContent;
    current.set(card, next);
    image.src = next ? image.dataset.run : image.dataset.still;
    button.setAttribute("aria-pressed", String(next));
    button.setAttribute("aria-label", title + (next ? " 움직임 멈춤" : " 움직임 재생"));
    button.querySelector(".motion-icon").textContent = next ? "Ⅱ" : "▶";
    button.querySelector(".motion-label").textContent = next ? "멈춤" : "재생";
  }

  function repaint(card) {
    const wanted = overrides.get(card) ?? globalPlay;
    active(card, !card.hidden && wanted && (!canObserve || visible.has(card)));
  }

  if (canObserve) {
    const observer = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
        repaint(e.target);
      }
    }, {rootMargin: "20px", threshold: 0.01});
    cards.forEach(card => observer.observe(card));
  }

  function reflectGlobal() {
    allButton.textContent = globalPlay ? "전체 멈춤" : "전체 재생";
    allButton.setAttribute("aria-pressed", String(globalPlay));
  }

  for (const card of cards) card.querySelector("[data-motion]").addEventListener("click", () => {
    if (!card.hidden) {
      overrides.set(card, !(overrides.get(card) ?? globalPlay));
      if (canObserve) visible.add(card);
      repaint(card);
    }
  });

  for (const button of filterButtons) button.addEventListener("click", () => {
    chosen = button.dataset.filter;
    filterButtons.forEach(b => b.setAttribute("aria-pressed", String(b === button)));
    let n = 0;
    for (const card of cards) {
      card.hidden = chosen !== "all" && card.dataset.group !== chosen;
      if (!card.hidden) n++;
      else overrides.delete(card);
      repaint(card);
    }
    live.textContent = n + "종의 러너가 표시됩니다.";
  });

  allButton.addEventListener("click", () => {
    globalPlay = !globalPlay;
    overrides.clear();
    reflectGlobal();
    cards.forEach(repaint);
  });
  theme.addEventListener("click", () => {
    dark = !dark;
    nav.dataset.galleryTheme = dark ? "dark" : "light";
    theme.setAttribute("aria-pressed", String(dark));
    theme.textContent = dark ? "밝은 배경" : "어두운 배경";
  });
  reduced?.addEventListener?.("change", e => {
    if (e.matches) {
      overrides.clear();
      globalPlay = false;
      reflectGlobal();
      cards.forEach(repaint);
    }
  });
  toolbar.hidden = false;
})();
