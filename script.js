(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const LANGUAGE_KEY = "licoup-site-language";
  const MOTION_KEY = "licoup-site-motion";
  const languages = new Set(["en", "zh"]);
  const stateCopy = {
    en: {
      menuOpen: "Open menu",
      menuClose: "Close menu",
      motionPause: "Pause animation",
      motionResume: "Continue animation",
      motionReduced: "Animation reduced by system setting",
      languageTarget: "切换到中文",
    },
    zh: {
      menuOpen: "打开菜单",
      menuClose: "关闭菜单",
      motionPause: "暂停动画",
      motionResume: "继续动画",
      motionReduced: "系统已减少动画",
      languageTarget: "Switch to English",
    },
  };

  const readPreference = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const savePreference = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage can be unavailable in private or restricted browsing modes.
    }
  };

  const normalizeLanguage = (value) => {
    if (typeof value !== "string") return null;
    const primary = value.trim().toLowerCase().split("-")[0];
    return languages.has(primary) ? primary : null;
  };

  const languageFromBrowser = () => {
    const preferences = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const preference of preferences) {
      const language = normalizeLanguage(preference);
      if (language) return language;
    }
    return "en";
  };

  const requestedLanguage = normalizeLanguage(
    new URL(window.location.href).searchParams.get("lang"),
  );
  let currentLanguage =
    requestedLanguage ??
    normalizeLanguage(readPreference(LANGUAGE_KEY)) ??
    languageFromBrowser();

  const initialize = () => {
    const languageToggle = document.querySelector("#language-toggle");
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");
    const menuLabel = menuToggle?.querySelector("[data-menu-label]");
    const motionToggle = document.querySelector("#motion-toggle");
    const motionLabel = motionToggle?.querySelector("[data-motion-label]");
    const heroStage = document.querySelector("#hero-stage");
    const heroArt = document.querySelector("#hero-art");
    const desktopNavigation = window.matchMedia("(min-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let userPaused = readPreference(MOTION_KEY) === "paused";
    let menuOpen = false;
    let pointerFrame = 0;
    let hasPointer = false;
    let pointerClientX = 0;
    let pointerClientY = 0;
    const panelAnimations = new Set();

    const localizedAttribute = (element, name, fallback) =>
      element?.getAttribute(`data-${name}-${currentLanguage}`) || fallback;

    const updateMenuLabel = () => {
      if (!menuToggle) return;
      const fallback = menuOpen
        ? stateCopy[currentLanguage].menuClose
        : stateCopy[currentLanguage].menuOpen;
      const label = localizedAttribute(
        menuToggle,
        menuOpen ? "close" : "open",
        fallback,
      );
      if (menuLabel) menuLabel.textContent = label;
      menuToggle.setAttribute("aria-label", label);
    };

    const motionIsPaused = () => reducedMotion.matches || userPaused;
    const motionIsAllowed = () =>
      !motionIsPaused() && document.visibilityState !== "hidden";

    const cancelPanelAnimations = () => {
      for (const animation of panelAnimations) animation.cancel();
      panelAnimations.clear();
    };

    const resetHeroPointer = () => {
      if (pointerFrame) {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
      }
      hasPointer = false;
      heroArt?.style.setProperty("--pointer-x", "0px");
      heroArt?.style.setProperty("--pointer-y", "0px");
    };

    const updateMotionState = () => {
      const paused = motionIsPaused();
      document.body.classList.toggle("motion-paused", paused);

      if (motionToggle) {
        const label = reducedMotion.matches
          ? localizedAttribute(
              motionToggle,
              "reduced",
              stateCopy[currentLanguage].motionReduced,
            )
          : userPaused
            ? localizedAttribute(
                motionToggle,
                "resume",
                stateCopy[currentLanguage].motionResume,
              )
            : localizedAttribute(
                motionToggle,
                "pause",
                stateCopy[currentLanguage].motionPause,
              );
        motionToggle.disabled = reducedMotion.matches;
        motionToggle.setAttribute("aria-pressed", String(paused));
        motionToggle.setAttribute("aria-label", label);
        if (motionLabel) motionLabel.textContent = label;
      }

      if (paused) {
        resetHeroPointer();
        cancelPanelAnimations();
      }
    };

    const applyLanguage = (language, updateAddress = false) => {
      currentLanguage = language;
      root.lang = language;

      for (const element of document.querySelectorAll(
        "[data-en][data-zh]:not(title):not(meta)",
      )) {
        element.textContent = element.getAttribute(`data-${language}`) || "";
      }
      for (const element of document.querySelectorAll(
        "[data-aria-en][data-aria-zh]",
      )) {
        element.setAttribute(
          "aria-label",
          element.getAttribute(`data-aria-${language}`) || "",
        );
      }

      const title = document.querySelector("title[data-en][data-zh]");
      if (title) document.title = title.getAttribute(`data-${language}`) || "";
      for (const metadata of document.querySelectorAll(
        "meta[data-en][data-zh]",
      )) {
        metadata.setAttribute(
          "content",
          metadata.getAttribute(`data-${language}`) || "",
        );
      }

      if (languageToggle) {
        languageToggle.textContent = language === "en" ? "中文" : "EN";
        languageToggle.setAttribute(
          "aria-label",
          stateCopy[language].languageTarget,
        );
      }
      updateMenuLabel();
      updateMotionState();

      if (updateAddress) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", language);
        history.replaceState(history.state, "", url);
      }
    };

    const setMenuOpen = (open, returnFocus = false) => {
      menuOpen = Boolean(open && !desktopNavigation.matches);
      navMenu?.classList.toggle("is-open", menuOpen);
      menuToggle?.setAttribute("aria-expanded", String(menuOpen));
      updateMenuLabel();
      if (!menuOpen && returnFocus) menuToggle?.focus();
    };

    languageToggle?.addEventListener("click", () => {
      const language = currentLanguage === "en" ? "zh" : "en";
      savePreference(LANGUAGE_KEY, language);
      applyLanguage(language, true);
    });

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => setMenuOpen(!menuOpen));
      navMenu.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          setMenuOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuOpen) setMenuOpen(false, true);
      });
      desktopNavigation.addEventListener("change", (event) => {
        if (event.matches) setMenuOpen(false);
      });
    }

    motionToggle?.addEventListener("click", () => {
      if (reducedMotion.matches) return;
      userPaused = !userPaused;
      savePreference(MOTION_KEY, userPaused ? "paused" : "running");
      updateMotionState();
    });
    reducedMotion.addEventListener("change", updateMotionState);

    const tabsRoot = document.querySelector("#demo-tabs");
    if (tabsRoot) {
      const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
      const panels = new Map();
      for (const tab of tabs) {
        const panelId = tab.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel?.getAttribute("role") === "tabpanel") {
          panels.set(tab, panel);
        }
      }

      let activeTab =
        tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ??
        tabs[0];

      const activateTab = (nextTab, focus = false) => {
        if (!panels.has(nextTab)) return;
        cancelPanelAnimations();
        activeTab = nextTab;
        for (const tab of tabs) {
          const selected = tab === nextTab;
          tab.setAttribute("aria-selected", String(selected));
          tab.tabIndex = selected ? 0 : -1;
          const panel = panels.get(tab);
          if (panel) panel.hidden = !selected;
        }

        const panel = panels.get(nextTab);
        if (motionIsAllowed() && typeof panel.animate === "function") {
          const animation = panel.animate(
            [
              { opacity: 0, transform: "translateY(6px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 220, easing: "cubic-bezier(.2,.8,.2,1)" },
          );
          panelAnimations.add(animation);
          animation.addEventListener(
            "finish",
            () => panelAnimations.delete(animation),
            { once: true },
          );
          animation.addEventListener(
            "cancel",
            () => panelAnimations.delete(animation),
            { once: true },
          );
        }
        if (focus) nextTab.focus();
      };

      for (const tab of tabs) {
        tab.addEventListener("click", () => activateTab(tab));
        tab.addEventListener("keydown", (event) => {
          const index = tabs.indexOf(activeTab);
          let nextIndex = null;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % tabs.length;
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + tabs.length) % tabs.length;
          } else if (event.key === "Home") {
            nextIndex = 0;
          } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
          }
          if (nextIndex === null) return;
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        });
      }
      if (activeTab) activateTab(activeTab);
    }

    const revealElements = [...document.querySelectorAll(".reveal")];
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 },
      );
      revealElements.forEach((element) => revealObserver.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add("is-inview"));
    }

    if (heroStage && heroArt) {
      const renderPointer = () => {
        pointerFrame = 0;
        if (!hasPointer || !finePointer.matches || !motionIsAllowed()) {
          resetHeroPointer();
          return;
        }
        const bounds = heroStage.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = ((pointerClientX - bounds.left) / bounds.width - 0.5) * 12;
        const y = ((pointerClientY - bounds.top) / bounds.height - 0.5) * 12;
        heroArt.style.setProperty("--pointer-x", `${x.toFixed(2)}px`);
        heroArt.style.setProperty("--pointer-y", `${y.toFixed(2)}px`);
      };

      heroArt.addEventListener("pointermove", (event) => {
        if (!finePointer.matches || !motionIsAllowed()) return;
        hasPointer = true;
        pointerClientX = event.clientX;
        pointerClientY = event.clientY;
        if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointer);
      });
      heroArt.addEventListener("pointerleave", resetHeroPointer);
      finePointer.addEventListener("change", (event) => {
        if (!event.matches) resetHeroPointer();
      });
    }

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        resetHeroPointer();
        cancelPanelAnimations();
      }
    });

    setMenuOpen(false);
    applyLanguage(currentLanguage);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
