// ============================================================
// Sachin Jha — Portfolio
// Scroll reveals, nav state, mobile menu
// ============================================================

(function () {
  "use strict";

  // ---------- Scroll-reveal ----------
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---------- Nav background + reading progress on scroll ----------
  const nav = document.getElementById("nav");
  const progressBar = document.getElementById("progressBar");
  let scrollTicking = false;
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
    if (progressBar && !scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.transform =
          "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
        scrollTicking = false;
      });
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Ghost section numerals ----------
  document.querySelectorAll(".section").forEach((section) => {
    const num = section.querySelector(".section__num");
    if (!num) return;
    const ghost = document.createElement("span");
    ghost.className = "section__ghost";
    ghost.textContent = num.textContent;
    ghost.setAttribute("aria-hidden", "true");
    section.appendChild(ghost);
  });

  // ---------- Active nav link ----------
  const navLinks = new Map(
    Array.from(document.querySelectorAll(".nav__links a")).map((a) => [
      a.getAttribute("href").slice(1),
      a,
    ])
  );
  if ("IntersectionObserver" in window && navLinks.size) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.remove("is-active");
            link.removeAttribute("aria-current");
          });
          const link = navLinks.get(entry.target.id);
          if (link) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => sectionObserver.observe(section));
  }

  // ---------- Mobile menu ----------
  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("navMobile");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });

  // ---------- Copy email to clipboard ----------
  document.querySelectorAll(".contact__copy").forEach((btn) => {
    const label = btn.querySelector(".contact__copy-text");
    let resetTimer;
    const legacyCopy = (text) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      return ok;
    };
    const showCopied = () => {
      btn.classList.add("is-copied");
      if (label) label.textContent = "Copied";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        btn.classList.remove("is-copied");
        if (label) label.textContent = "Copy";
      }, 2000);
    };
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        showCopied();
      } catch {
        if (legacyCopy(btn.dataset.copy)) showCopied();
      }
    });
  });
})();
