document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  const setTheme = (isLight) => {
    document.body.classList.toggle("light-theme", isLight);
    document.body.dataset.theme = isLight ? "light" : "dark";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
  };

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const shouldUseLightTheme = savedTheme === "light" || (!savedTheme && prefersLight);

  setTheme(shouldUseLightTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = !document.body.classList.contains("light-theme");
      setTheme(isLight);
      localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 640) {
          navLinks.classList.remove("is-open");
          menuToggle.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});
