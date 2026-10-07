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
      motionResume: "Play animation",
      motionReduced: "Animation reduced by system setting",
      languageTarget: "切换到中文",
    },
    zh: {
      menuOpen: "打开菜单",
      menuClose: "关闭菜单",
      motionPause: "暂停动画",
      motionResume: "播放动画",
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

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let currentLanguage =
    normalizeLanguage(new URL(window.location.href).searchParams.get("lang")) ??
    normalizeLanguage(readPreference(LANGUAGE_KEY)) ??
    languageFromBrowser();

  const initialize = () => {
    const header = document.querySelector("#site-header");
    const languageToggle = document.querySelector("#language-toggle");
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");
    const menuLabel = menuToggle?.querySelector("[data-menu-label]");
    const motionToggle = document.querySelector("#motion-toggle");
    const motionLabel = motionToggle?.querySelector("[data-motion-label]");
    const desktopNavigation = window.matchMedia("(min-width: 881px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let userPaused = readPreference(MOTION_KEY) === "paused";
    let menuOpen = false;
    const languageListeners = [];
    const motionListeners = [];

    const motionIsPaused = () => reducedMotion.matches || userPaused;
    const motionIsAllowed = () =>
      !motionIsPaused() && document.visibilityState !== "hidden";

    const updateMenuLabel = () => {
      if (!menuToggle) return;
      const label = menuOpen
        ? stateCopy[currentLanguage].menuClose
        : stateCopy[currentLanguage].menuOpen;
      if (menuLabel) menuLabel.textContent = label;
      menuToggle.setAttribute("aria-label", label);
    };

    const updateMotionState = () => {
      const paused = motionIsPaused();
      document.body.classList.toggle("motion-paused", paused);
      if (motionToggle) {
        const copy = stateCopy[currentLanguage];
        const label = reducedMotion.matches
          ? copy.motionReduced
          : userPaused
            ? copy.motionResume
            : copy.motionPause;
        motionToggle.disabled = reducedMotion.matches;
        motionToggle.setAttribute("aria-pressed", String(paused));
        motionToggle.setAttribute("aria-label", label);
        if (motionLabel) motionLabel.textContent = label;
      }
      for (const listener of motionListeners) listener(paused);
    };

    const applyLanguage = (language, updateAddress = false) => {
      currentLanguage = language;
      root.lang = language;
      for (const element of document.querySelectorAll(
        "[data-en][data-zh]:not(title):not(meta)",
      )) {
        element.textContent = element.getAttribute(`data-${language}`) || "";
      }
      for (const element of document.querySelectorAll("[data-aria-en][data-aria-zh]")) {
        element.setAttribute("aria-label", element.getAttribute(`data-aria-${language}`) || "");
      }
      const title = document.querySelector("title[data-en][data-zh]");
      if (title) document.title = title.getAttribute(`data-${language}`) || "";
      for (const metadata of document.querySelectorAll("meta[data-en][data-zh]")) {
        metadata.setAttribute("content", metadata.getAttribute(`data-${language}`) || "");
      }
      if (languageToggle) {
        languageToggle.textContent = language === "en" ? "中文" : "EN";
        languageToggle.setAttribute("aria-label", stateCopy[language].languageTarget);
      }
      updateMenuLabel();
      updateMotionState();
      for (const listener of languageListeners) listener(language);
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
        if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false);
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

    // Scroll reveal
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
        { rootMargin: "0px 0px -8%", threshold: 0.1 },
      );
      revealElements.forEach((element) => revealObserver.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add("is-inview"));
    }

    // Statement: one line per clause, lit word by word (characters for Chinese) while scrolling.
    const scrubs = [...document.querySelectorAll(".scrub")].map((element) => {
      const zh = element.getAttribute("data-lang") === "zh";
      const text = element.textContent.trim();
      const highlight = zh ? new Set([..."决定"]) : new Set(["call."]);
      const clauses = text.match(zh ? /[^，。]+[，。]?/g : /[^.]+\.?/g) ?? [text];
      element.setAttribute("aria-label", text);
      element.textContent = "";
      const words = [];
      for (const clause of clauses) {
        const line = document.createElement("span");
        line.className = "clause";
        line.setAttribute("aria-hidden", "true");
        const parts = zh ? [...clause.trim()] : clause.trim().split(/\s+/);
        parts.forEach((part, index) => {
          const span = document.createElement("span");
          span.className = highlight.has(part) ? "w hl" : "w";
          span.textContent = zh || index === parts.length - 1 ? part : `${part} `;
          line.append(span);
          words.push(span);
        });
        element.append(line);
      }
      return { element, words };
    });

    // Scroll-linked effects
    const app = document.querySelector("#app");
    const appFrame = document.querySelector("#app-frame");
    let lastScrollY = window.scrollY;
    let scrollFrame = 0;
    const renderScroll = () => {
      scrollFrame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (header) {
        header.classList.toggle("is-scrolled", y > 8);
        header.classList.toggle("is-hidden", !menuOpen && y > lastScrollY && y > 480);
      }
      lastScrollY = y;

      const still = motionIsPaused();
      if (appFrame) {
        const top = appFrame.getBoundingClientRect().top;
        if (still) {
          appFrame.style.removeProperty("--tilt");
          appFrame.style.removeProperty("--scale");
        } else {
          const progress = clamp((vh - top) / (vh * 0.6));
          appFrame.style.setProperty("--tilt", `${(10 * (1 - progress)).toFixed(2)}deg`);
          appFrame.style.setProperty("--scale", (0.94 + 0.06 * progress).toFixed(3));
        }
        updateGrip(top);
      }

      for (const { element, words } of scrubs) {
        if (!element.offsetParent) continue;
        const rect = element.getBoundingClientRect();
        const progress = still ? 1 : clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.3));
        const lit = Math.round(progress * words.length);
        words.forEach((word, index) => word.classList.toggle("on", index < lit));
      }
    };
    const requestScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(renderScroll);
    };
    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("resize", requestScroll);
    motionListeners.push(requestScroll);
    languageListeners.push(requestScroll);

    // Lico reacts to clicks and to the illustrative conversation.
    const peek = document.querySelector("#peek");
    const peekLico = document.querySelector("#peek-lico");
    const closingLico = document.querySelector("#closing-lico");
    const moodTimers = new WeakMap();
    const setMood = (element, mood, revertAfter = 0) => {
      if (!element) return;
      clearTimeout(moodTimers.get(element));
      element.dataset.mood = mood;
      if (revertAfter) {
        moodTimers.set(element, setTimeout(() => {
          element.dataset.mood = "neutral";
          if (element === peekLico) peek?.classList.remove("is-happy");
        }, revertAfter));
      }
    };
    peek?.addEventListener("click", () => {
      peek.classList.add("is-happy");
      setMood(peekLico, "happy", 1800);
    });
    closingLico?.addEventListener("click", () => setMood(closingLico, "happy", 1800));
    closingLico?.addEventListener("pointerenter", () => setMood(closingLico, "happy", 1600));

    // One grip line, one coordinate system. Lico never leaves the window's
    // local axes: while the window's edge is below the screen, Lico slides up
    // its own axis and waits with its palms on the screen's bottom edge; the
    // window's edge picks it up the moment it rises to meet them. The position
    // is a continuous function of scroll, so the handoff has no jump.
    const updateGrip = (top = appFrame ? appFrame.getBoundingClientRect().top : 0) => {
      if (!peek || !appFrame) return;
      const tilt = parseFloat(appFrame.style.getPropertyValue("--tilt")) || 0;
      const scale = parseFloat(appFrame.style.getPropertyValue("--scale")) || 1;
      const grip = scale * Math.cos((tilt * Math.PI) / 180);
      peek.style.setProperty("--floor", `${(Math.min(0, window.innerHeight - top) / grip).toFixed(1)}px`);
    };
    if (peek && appFrame) {
      // The entrance animation also moves the window without firing scroll,
      // so keep refreshing the grip until it has settled.
      const warmupEnd = performance.now() + 3000;
      const gripTick = () => {
        updateGrip();
        if (performance.now() < warmupEnd) requestAnimationFrame(gripTick);
      };
      requestAnimationFrame(gripTick);
    }
    // Layout can settle after webfonts and images load; keep the grip exact.
    window.addEventListener("load", requestScroll);

    // Illustrative messenger conversation
    const chatLog = document.querySelector("#chat-log");
    if (app && chatLog) {
      const steps = new Map(
        [...chatLog.querySelectorAll("[data-step]")].map((element) => [element.dataset.step, element]),
      );
      const approval = steps.get("approve");
      const typing = document.querySelector("#typing");
      const composer = document.querySelector("#composer-text");
      const mentionPop = document.querySelector("#mention-pop");
      const mentionHot = mentionPop?.querySelector(".is-hot");
      const shareSheet = document.querySelector("#share-sheet");
      const shareTargets = [...(shareSheet?.querySelectorAll("[data-target]") ?? [])];
      const cursor = document.querySelector("#fake-cursor");
      const allow = document.querySelector("#allow-btn");
      const share = document.querySelector("#share-btn");
      const send = document.querySelector("#send-btn");
      const shareSend = document.querySelector("#ss-send");
      let run = 0;
      let visible = false;

      const closeOverlays = () => {
        mentionPop?.classList.remove("is-open");
        shareSheet?.classList.remove("is-open");
        shareTargets.forEach((item) => item.classList.remove("is-picked"));
        typing?.classList.remove("is-visible");
        cursor?.classList.remove("is-visible");
        if (composer) composer.textContent = "";
      };

      const showFinal = () => {
        app.classList.remove("is-playing", "is-fading");
        approval?.classList.add("is-approved");
        closeOverlays();
      };

      const reset = () => {
        app.classList.add("is-playing");
        app.classList.remove("is-fading");
        steps.forEach((element) => element.classList.remove("is-shown"));
        approval?.classList.remove("is-approved");
        closeOverlays();
        if (cursor) cursor.style.transform = `translate(${app.clientWidth - 80}px, ${app.clientHeight - 30}px)`;
      };

      const play = async (token) => {
        const pause = async (ms) => {
          await wait(ms);
          if (token !== run) throw new Error("cancelled");
        };
        const show = (name) => steps.get(name)?.classList.add("is-shown");
        const press = async (element) => {
          element?.classList.add("is-pressed");
          await pause(180);
          element?.classList.remove("is-pressed");
        };
        const pointAt = async (element, dwell = 850) => {
          if (!cursor || !element) return;
          const appRect = app.getBoundingClientRect();
          const target = element.getBoundingClientRect();
          const scale = appRect.width / app.offsetWidth || 1;
          const x = (target.left - appRect.left + target.width * 0.55) / scale;
          const y = (target.top - appRect.top + target.height * 0.55) / scale;
          cursor.classList.add("is-visible");
          await pause(40);
          cursor.style.transform = `translate(${x}px, ${y}px)`;
          await pause(dwell);
        };
        const typeText = async (from, to, text, speed) => {
          for (let index = from + 1; index <= to; index += 1) {
            if (composer) composer.textContent = text.slice(0, index);
            await pause(speed);
          }
        };
        const showTyping = () => {
          if (!typing) return;
          chatLog.append(typing);
          typing.classList.add("is-visible");
        };

        reset();
        setMood(peekLico, "neutral");
        await pause(500);
        show("ask");
        await pause(1100);

        const text = composer?.getAttribute(`data-type-${currentLanguage}`) ?? "";
        const speed = currentLanguage === "zh" ? 80 : 34;
        const mentionEnd = "@Claude Code".length;
        await typeText(0, 1, text, speed);
        mentionPop?.classList.add("is-open");
        await pause(750);
        await press(mentionHot);
        mentionPop?.classList.remove("is-open");
        if (composer) composer.textContent = text.slice(0, mentionEnd);
        await pause(250);
        await typeText(mentionEnd, text.length, text, speed);
        await pause(350);
        await press(send);
        if (composer) composer.textContent = "";
        show("mention");

        await pause(800);
        show("approve");
        await pause(400);
        await pointAt(allow);
        await press(allow);
        approval?.classList.add("is-approved");
        cursor?.classList.remove("is-visible");

        await pause(500);
        showTyping();
        setMood(peekLico, "thinking");
        await pause(1500);
        typing?.classList.remove("is-visible");
        show("card");
        setMood(peekLico, "neutral");
        await pause(1300);
        show("react");
        await pause(1000);

        await pointAt(share, 800);
        await press(share);
        shareSheet?.classList.add("is-open");
        await pause(400);
        for (const item of shareTargets) {
          await pointAt(item, 550);
          item.classList.add("is-picked");
          await pause(200);
        }
        await pointAt(shareSend, 600);
        await press(shareSend);
        shareSheet?.classList.remove("is-open");
        cursor?.classList.remove("is-visible");
        await pause(300);
        show("shared");
        setMood(peekLico, "happy", 2200);

        await pause(4000);
        app.classList.add("is-fading");
        await pause(600);
      };

      const start = async () => {
        run += 1;
        const token = run;
        if (!visible || !motionIsAllowed()) {
          showFinal();
          return;
        }
        try {
          while (token === run) await play(token);
        } catch {
          // A newer run or a pause cancelled this one.
        }
      };

      if ("IntersectionObserver" in window) {
        new IntersectionObserver((entries) => {
          const isVisible = entries.some((entry) => entry.isIntersecting);
          if (isVisible === visible) return;
          visible = isVisible;
          if (visible) start();
          else run += 1;
        }, { threshold: 0.3 }).observe(app);
      }
      motionListeners.push((paused) => {
        if (paused) {
          run += 1;
          showFinal();
        } else if (visible) {
          start();
        }
      });
      languageListeners.push(() => visible && motionIsAllowed() && start());
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") run += 1;
        else if (visible) start();
      });
    }

    setMenuOpen(false);
    applyLanguage(currentLanguage);
    requestScroll();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
