document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for all in-page links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Scroll down button
  const scrollDown = document.getElementById("scrollDown");
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      const about = document.getElementById("about");
      if (about) about.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Active nav link on scroll
  const navLinks = Array.from(document.querySelectorAll(".navlink"));
  const sections = navLinks
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if (sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === id)
          );
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((s) => io.observe(s));
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const setMenu = (open) => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");
      setMenu(!isOpen);
    });

    document.querySelectorAll(".mnav").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  // Contact form demo submit
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = form.querySelector("button[type='submit']");
      if (!btn) return;

      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.style.opacity = "0.85";

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.opacity = "1";
        form.reset();

        setTimeout(() => {
          btn.innerHTML = original;
        }, 2000);
      }, 1200);
    });
  }
});
